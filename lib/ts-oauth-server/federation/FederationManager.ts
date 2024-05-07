import { Federation } from './Federation';
import { FederationConfig } from './FederationConfig';

// TODO Authorization Endpoint
export class FederationManager {
  private static Holder = class {
    static readonly INSTANCE = new FederationManager();
  };

  private readonly mConfigurations?: FederationConfig[];
  private readonly mFederations?: Record<string, Federation>;

  private constructor() {
    // TODO : Implement FederationManager constructor
    // this.mConfigurations = loadConfigurations();
    // this.mFederations = buildFederations(mConfigurations);
  }

  public static getInstance() {
    return FederationManager.Holder.INSTANCE;
  }
  public getConfigurations() {
    return this.mConfigurations;
  }
}
