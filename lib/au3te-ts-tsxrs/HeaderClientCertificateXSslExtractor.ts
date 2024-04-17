import HeaderClientCertificateExtractor from './HeaderClientCertificateExtractor';

export default class HeaderClientCertificateXSslExtractor extends HeaderClientCertificateExtractor {
    private clientCertificateChainHeaders: string[] = [];

    public getClientCertificateChainHeaders(): string[] {
        return this.clientCertificateChainHeaders;
    }
    public setClientCertificateChainHeaders(): HeaderClientCertificateExtractor(clientCertificateChainHeaders: string[]) => {
        throw new Error();
    }
}