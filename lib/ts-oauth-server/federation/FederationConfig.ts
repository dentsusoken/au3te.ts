import { ClientConfig } from './ClientConfig';
import { ConfigValidationHelper } from './ConfigValidationHelper';
import { ServerConfig } from './ServerConfig';

export class FederationConfig {
  private id?: string;
  private server?: ServerConfig;
  private client?: ClientConfig;

  getId(): string | undefined {
    return this.id;
  }

  setId(id: string): FederationConfig {
    this.id = id;
    return this;
  }

  getServer(): ServerConfig | undefined {
    return this.server;
  }

  setServer(server: ServerConfig): FederationConfig {
    this.server = server;
    return this;
  }

  getClient(): ClientConfig | undefined {
    return this.client;
  }

  setClient(client: ClientConfig): FederationConfig {
    this.client = client;
    return this;
  }

  validate(): void {
    ConfigValidationHelper.ensureNotEmpty('id', this.id);
    ConfigValidationHelper.ensureNotEmpty('server', this.server);
    ConfigValidationHelper.ensureNotEmpty('client', this.client);

    this.server!.validate();
    this.client!.validate();
  }
}
