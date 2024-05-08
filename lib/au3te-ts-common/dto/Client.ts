import { SubjectType } from '../types/SubjectType';

export class Client {
  private clientName?: string;
  private logoUri?: URL;
  private clientUri?: URL;
  private policyUri?: URL;
  private tosUri?: URL;
  private description?: string;
  private subjectType?: SubjectType;
  private derivedSectorIdentifier?: string;

  public getClientName(): string | undefined {
    return this.clientName;
  }
  public getLogoUri(): URL | undefined {
    return this.logoUri;
  }
  public getClientUri(): URL | undefined {
    return this.clientUri;
  }
  public getPolicyUri(): URL | undefined {
    return this.policyUri;
  }
  public getTosUri(): URL | undefined {
    return this.tosUri;
  }
  public getDescription(): string | undefined {
    return this.description;
  }
  public getSubjectType(): SubjectType | undefined {
    return this.subjectType;
  }
  public getDerivedSectorIdentifier(): string | undefined {
    return this.derivedSectorIdentifier;
  }
}
