export class ServiceConfigurationRequest {
  constructor(private pretty?: boolean, private patch?: string) {}

  isPretty() {
    return this.pretty;
  }

  setPretty(pretty: boolean) {
    this.pretty = pretty;
    return this;
  }

  getPatch() {
    return this.patch;
  }

  setPatch(patch?: string) {
    this.patch = patch;
    return this;
  }
}
