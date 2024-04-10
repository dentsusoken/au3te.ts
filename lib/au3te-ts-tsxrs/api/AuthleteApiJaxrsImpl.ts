import { AuthleteApi, AuthleteApiException, AuthleteConfiguration, Settings } from 'authlete-jaxrs-api';
import { JWK, JWSHeader, JWTClaimsSet, JWSObject, SignedJWT } from 'jsonwebtoken';
import { ClientBuilder } from 'javax.ws.rs.client';
import { WebApplicationException, ResponseProcessingException, Response, StatusType } from 'javax.ws.rs.core';

export abstract class AuthleteApiJaxrsImpl implements AuthleteApi {
    private static readonly JSON_UTF8_TYPE = 'application/json;charset=UTF-8';

    private readonly mBaseUrl: string;
    private readonly mSettings: Settings;
    private mJaxRsClient: javax.ws.rs.client.Client | null;

    private mCurrentConnectionTimeout: number;
    private mCurrentReadTimeout: number;

    private jaxRsClientBuilder: ClientBuilder;

    private mDpopJwk: JWK | null;
    private mJwsSigner: JWSSigner | null;

    constructor(configuration: AuthleteConfiguration) {
        if (!configuration) {
            throw new Error('configuration is null.');
        }

        this.mBaseUrl = configuration.getBaseUrl();
        this.extractDpop(configuration);
        this.mSettings = new Settings();
    }

    private extractDpop(configuration: AuthleteConfiguration): void {
        if (configuration.getDpopKey()) {
            try {
                this.mDpopJwk = JWK.parse(configuration.getDpopKey());
                if (!this.mDpopJwk.getAlgorithm()) {
                    throw new Error("DPoP JWK must contain an 'alg' field.");
                }
                this.mJwsSigner = new DefaultJWSSignerFactory().createJWSSigner(this.mDpopJwk);
            } catch (e) {
                throw new Error("DPoP JWK is not valid.");
            }
        }
    }

    private getJaxRsClient(): javax.ws.rs.client.Client {
        if (!this.mJaxRsClient) {
            const client = this.createJaxRsClient();

            synchronized (this) {
                if (!this.mJaxRsClient) {
                    this.mJaxRsClient = client;
                }
            }
        }

        this.setConnectionTimeout(this.mJaxRsClient);
        this.setReadTimeout(this.mJaxRsClient);

        return this.mJaxRsClient;
    }

    private createJaxRsClient(): javax.ws.rs.client.Client {
        if (this.getJaxRsClientBuilder()) {
            return this.getJaxRsClientBuilder().build();
        } else {
            return ClientBuilder.newClient();
        }
    }

    private setConnectionTimeout(client: javax.ws.rs.client.Client): void {
        const timeout = this.mSettings.getConnectionTimeout();

        synchronized (this.mConnectionTimeoutLock) {
            if (this.mCurrentConnectionTimeout === timeout) {
                return;
            }

            this.mCurrentConnectionTimeout = timeout;
        }

        const value = Integer.valueOf(timeout);

        client.property('jersey.config.client.connectTimeout', value);
        client.property('http.connection.timeout', value);
        client.property('com.ibm.ws.jaxrs.client.connection.timeout', value);
    }

    private setReadTimeout(client: javax.ws.rs.client.Client): void {
        const timeout = this.mSettings.getReadTimeout();

        synchronized (this.mReadTimeoutLock) {
            if (this.mCurrentReadTimeout === timeout) {
                return;
            }

            this.mCurrentReadTimeout = timeout;
        }

        const value = Integer.valueOf(timeout);

        client.property('jersey.config.client.readTimeout', value);
        client.property('http.receive.timeout', value);
        client.property('com.ibm.ws.jaxrs.client.receive.timeout', value);
    }

    protected getTarget(): WebTarget {
        return this.getJaxRsClient().target(this.mBaseUrl);
    }

    protected wrapWithDpop(target: Invocation.Builder, path: string, method: string): Invocation.Builder {
        if (this.mDpopJwk) {
            const htu = this.mBaseUrl + path;

            const header = new JWSHeader.Builder(JWSAlgorithm.RS256)
                .type(new JOSEObjectType('dpop+jwt'))
                .jwk(this.mDpopJwk)
                .build();

            const claims = new JWTClaimsSet.Builder()
                .claim('htm', method)
                .claim('htu', htu)
                .jwtID(UUID.randomUUID().toString())
                .issueTime(new Date())
                .build();

            const dpop = new SignedJWT(header, claims);

            try {
                dpop.sign(this.mJwsSigner);
            } catch (e) {
                throw new Error('Failed to sign DPoP JWT.');
            }

            return target.header('DPoP', dpop.serialize());
        } else {
            return target;
        }
    }

    protected executeApiCall<TResponse>(apiCall: AuthleteApiCall<TResponse>): TResponse {
        try {
            return apiCall.call();
        } catch (e) {
            if (e instanceof WebApplicationException || e instanceof ResponseProcessingException) {
                throw this.createApiException(e, e.getResponse());
            } else {
                throw this.createApiException(e, null);
            }
        }
    }

    private createApiException(cause: Error, response: Response | null): AuthleteApiException {
        const message = cause.message;
        let statusCode = 0;
        let statusMessage = null;
        let responseBody = null;
        let headers = null;

        if (response) {
            const type = response.getStatusInfo();
            if (type) {
                statusCode = type.getStatusCode();
                statusMessage = type.getReasonPhrase();
            }

            if (this.hasEntity(response)) {
                responseBody = this.extractResponseBody(response);
            }

            headers = response.getStringHeaders();
        }

        return new AuthleteApiException(message, cause, statusCode, statusMessage, responseBody, headers);
    }

    private hasEntity(response: Response): boolean {
        try {
            return response.hasEntity();
        } catch (e) {
            return false;
        }
    }

    private extractResponseBody(response: Response): string | null {
        try {
            return response.readEntity(String);
        } catch (e) {
            console.error('Failed to read response body:', e);
            return null;
        }
    }

    protected callGetApi<TResponse>(auth: string, path: string, responseClass: Class<TResponse>, params: Map<string, Object[]> | null): TResponse {
        let webTarget = this.getTarget().path(path);

        if (params) {
            for (const [key, value] of params.entries()) {
                webTarget = webTarget.queryParam(key, value);
            }
        }

        return this.wrapWithDpop(webTarget.request(APPLICATION_JSON_TYPE), path, 'GET')
            .header(AUTHORIZATION, auth)
            .get(responseClass);
    }

    protected callDeleteApi(auth: string, path: string): void {
        this.wrapWithDpop(this.getTarget().path(path).request(), path, 'DELETE')
            .header(AUTHORIZATION, auth)
            .delete();
    }

    protected callPostApi<TResponse>(auth: string, path: string, request: any, responseClass: Class<TResponse>): TResponse {
        return this.wrapWithDpop(this.getTarget().path(path).request(APPLICATION_JSON_TYPE), path, 'POST')
            .header(AUTHORIZATION, auth)
            .post(Entity.entity(request, JSON_UTF8_TYPE), responseClass);
    }

    public getJaxRsClientBuilder(): ClientBuilder {
        return this.jaxRsClientBuilder;
    }

    public setJaxRsClientBuilder(jaxRsClientBuilder: ClientBuilder): void {
        this.jaxRsClientBuilder = jaxRsClientBuilder;
    }

    public getSettings(): Settings {
        return this.mSettings;
    }

    protected isDpopEnabled(): boolean {
        return this.mDpopJwk !== null;
    }
}
