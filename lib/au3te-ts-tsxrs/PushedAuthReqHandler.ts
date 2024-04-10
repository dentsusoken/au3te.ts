import { WebApplicationException, Response } from 'javax.ws.rs';
import { MultivaluedMap } from 'javax.ws.rs.core';
import { AuthleteApi } from 'com.authlete.common.api';
import { PushedAuthReqResponse, Action } from 'com.authlete.common.dto.PushedAuthReqResponse';
import { BasicCredentials } from 'com.authlete.common.web';
import { BaseHandler } from './BaseHandler';

/**
 * Handler for pushed authorization request endpoint requests.
 */
export class PushedAuthReqHandler extends BaseHandler {
    /**
     * Parameters passed to the `handle` method.
     */
    export interface Params {
        parameters: MultivaluedMap<string, string>;
        authorization: string;
        clientCertificatePath: string[];
        dpop: string;
        htm: string;
        htu: string;
    }

    /**
     * Constructor with an implementation of `AuthleteApi` interface.
     */
    constructor(api: AuthleteApi) {
        super(api);
    }

    /**
     * Handle a pushed authorization request.
     */
    handle(parameters: MultivaluedMap<string, string>, authorization: string, clientCertificatePath: string[]): Response {
        const params: Params = {
            parameters,
            authorization,
            clientCertificatePath,
            dpop: '',
            htm: '',
            htu: ''
        };

        return this.handle(params);
    }

    /**
     * Handle a PAR request.
     */
    handle(params: Params): Response {
        const credentials = BasicCredentials.parse(params.authorization);
        const clientId = credentials?.getUserId() ?? null;
        const clientSecret = credentials?.getPassword() ?? null;

        try {
            return this.process(
                params.parameters,
                clientId,
                clientSecret,
                params.clientCertificatePath,
                params.dpop,
                params.htm,
                params.htu
            );
        } catch (e) {
            if (e instanceof WebApplicationException) {
                throw e;
            } else {
                throw new Error('Unexpected error in PushedAuthReqHandler');
            }
        }
    }

    /**
     * Process the parameters of the pushed authorization request.
     */
    private process(
        parameters: MultivaluedMap<string, string>,
        clientId: string | null,
        clientSecret: string | null,
        clientCertificatePath: string[] | null,
        dpop: string,
        htm: string,
        htu: string
    ): Response {
        let clientCertificate: string | null = null;
        if (clientCertificatePath && clientCertificatePath.length > 0) {
            clientCertificate = clientCertificatePath[0];

            if (clientCertificatePath.length > 1) {
                clientCertificatePath = clientCertificatePath.slice(1);
            }
        }

        const response: PushedAuthReqResponse = this.getApiCaller().callPushedAuthReq(
            parameters,
            clientId,
            clientSecret,
            clientCertificate,
            clientCertificatePath,
            dpop,
            htm,
            htu
        );

        const action: Action = response.getAction();
        const content: string = response.getResponseContent();
        const headers: Map<string, Object> = this.prepareHeaders(response);

        switch (action) {
            case Action.BAD_REQUEST:
                return ResponseUtil.badRequest(content, headers);
            case Action.CREATED:
                return ResponseUtil.created(content, headers);
            case Action.FORBIDDEN:
                return ResponseUtil.forbidden(content, headers);
            case Action.INTERNAL_SERVER_ERROR:
                return ResponseUtil.internalServerError(content, headers);
            case Action.PAYLOAD_TOO_LARGE:
                return ResponseUtil.tooLarge(content, headers);
            case Action.UNAUTHORIZED:
                return ResponseUtil.unauthorized(content, null, headers);
            default:
                throw this.getApiCaller().unknownAction('/api/pushed_auth_req', action);
        }
    }

    private prepareHeaders(response: PushedAuthReqResponse): Map<string, Object> {
        const headers: Map<string, Object> = new LinkedHashMap<string, Object>();

        const dpopNonce: string | null = response.getDpopNonce();
        if (dpopNonce) {
            headers.put('DPoP-Nonce', dpopNonce);
        }

        return headers;
    }
}
