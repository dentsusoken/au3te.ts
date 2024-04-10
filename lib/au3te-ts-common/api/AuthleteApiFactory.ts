import { AuthleteApi } from './AuthleteApi';
import { AuthleteConfiguration } from './AuthleteConfiguration';
import { AuthletePropertiesConfiguration } from './AuthletePropertiesConfiguration';

export class AuthleteApiFactory {
    private static readonly IMPL_JAX_RS_V2 = 'com.authlete.jaxrs.api.AuthleteApiImpl';
    private static readonly IMPL_JAX_RS_V3 = 'com.authlete.jaxrs.api.AuthleteApiImplV3';
    private static readonly IMPL_JAKARTA_V2 = 'com.authlete.jakarta.api.AuthleteApiImpl';
    private static readonly IMPL_JAKARTA_V3 = 'com.authlete.jakarta.api.AuthleteApiImplV3';
    private static readonly IMPL_HTTP_URL_CONNECTION = 'com.authlete.common.api.AuthleteApiImpl';

    private static readonly sKnownImplsV2 = [
        AuthleteApiFactory.IMPL_JAX_RS_V2,
        AuthleteApiFactory.IMPL_JAKARTA_V2,
        AuthleteApiFactory.IMPL_HTTP_URL_CONNECTION
    ];

    private static readonly sKnownImplsV3 = [
        AuthleteApiFactory.IMPL_JAX_RS_V3,
        AuthleteApiFactory.IMPL_JAKARTA_V3
    ];

    private static sDefaultApi: AuthleteApi | null = null;

    private constructor() {}

    public static create(configuration: AuthleteConfiguration): AuthleteApi | null {
        const version = AuthleteApiVersion.parse(configuration.getApiVersion());

        if (version === AuthleteApiVersion.V3) {
            return AuthleteApiFactory.createImpl(configuration, AuthleteApiFactory.sKnownImplsV3);
        } else {
            return AuthleteApiFactory.createImpl(configuration, AuthleteApiFactory.sKnownImplsV2);
        }
    }

    private static createImpl(configuration: AuthleteConfiguration, implementations: string[]): AuthleteApi | null {
        for (const className of implementations) {
            try {
                return AuthleteApiFactory.createInstance(configuration, className);
            } catch (e) {
                // Ignore.
            }
        }

        return null;
    }

    public static createInstance(configuration: AuthleteConfiguration, className: string): AuthleteApi {
        if (!configuration) {
            throw new Error('configuration is null.');
        }

        if (!className) {
            throw new Error('className is null.');
        }

        let clazz: any;

        try {
            clazz = require(className);
        } catch (e) {
            throw new Error(`${className} is not found.`);
        }

        if (!AuthleteApi.isImplementedBy(clazz)) {
            throw new Error(`${className} does not implement AuthleteApi interface.`);
        }

        let constructor: any;

        try {
            constructor = clazz.getConstructor(AuthleteConfiguration);
        } catch (e) {
            throw new Error(`${className} does not have a constructor which takes one AuthleteConfiguration parameter.`);
        }

        let api: AuthleteApi;

        try {
            api = new constructor(configuration);
        } catch (e) {
            throw new Error(`Failed to create an instance of ${className}.`);
        }

        return api;
    }

    public static getDefaultApi(): AuthleteApi {
        if (AuthleteApiFactory.sDefaultApi) {
            return AuthleteApiFactory.sDefaultApi;
        }

        synchronized(AuthleteApiFactory) {
            if (AuthleteApiFactory.sDefaultApi) {
                return AuthleteApiFactory.sDefaultApi;
            }

            const ac = new AuthletePropertiesConfiguration();
            AuthleteApiFactory.sDefaultApi = AuthleteApiFactory.create(ac);

            return AuthleteApiFactory.sDefaultApi;
        }
    }
}
