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

  static parse(obj: Record<string, unknown>) {
    const instance = new Client();
    if (obj['clientName']) {
      instance.clientName = obj['clientName'] as string;
    }
    if (obj['logoUri']) {
      instance.logoUri = new URL(obj['logoUri'] as string);
    }
    if (obj['clientUri']) {
      instance.clientUri = new URL(obj['clientUri'] as string);
    }
    if (obj['policyUri']) {
      instance.policyUri = new URL(obj['policyUri'] as string);
    }
    if (obj['tosUri']) {
      instance.tosUri = new URL(obj['tosUri'] as string);
    }
    if (obj['description']) {
      instance.description = obj['description'] as string;
    }
    if (obj['subjectType']) {
      instance.subjectType = SubjectType.parse(
        obj['subjectType'] as Record<string, unknown>
      );
    }
    if (obj['derivedSectorIdentifier']) {
      instance.derivedSectorIdentifier = obj[
        'derivedSectorIdentifier'
      ] as string;
    }

    return instance;
  }
}
