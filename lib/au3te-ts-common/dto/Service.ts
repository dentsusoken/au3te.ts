export default class Service {
  private serviceName?: string;
  getServiceName(): string | undefined {
    return this.serviceName;
  }
  setServiceName(serviceName: string): Service {
    this.serviceName = serviceName;
    return this;
  }
}
