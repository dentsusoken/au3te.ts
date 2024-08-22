export class Service {
  private serviceName?: string;
  getServiceName(): string | undefined {
    return this.serviceName;
  }
  setServiceName(serviceName: string): Service {
    this.serviceName = serviceName;
    return this;
  }

  static parse(obj: Record<string, unknown>) {
    const instance = new Service();
    if (obj['serviceName']) {
      instance.setServiceName(obj['serviceName'] as string);
    }
    return instance;
  }
}
