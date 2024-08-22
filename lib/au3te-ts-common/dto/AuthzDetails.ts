import { AuthzDetailsElement } from './AuthzDetailsElement';

export class AuthzDetails {
  private elements?: AuthzDetailsElement[];

  public getElements(): AuthzDetailsElement[] | undefined {
    return this.elements;
  }

  public setElements(elements: AuthzDetailsElement[]): AuthzDetails {
    this.elements = elements;
    return this;
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  public static fromJson(json: string): AuthzDetails {
    const obj = JSON.parse(json);
    const instance = new AuthzDetails();
    if (Array.isArray(obj)) {
      instance.setElements(obj);
    } else if (typeof obj === 'object') {
      instance.setElements(Object.values(obj));
    }
    return instance;
  }

  static parse(obj: Record<string, unknown>) {
    const instance = new AuthzDetails();
    if (obj && obj['elements']) {
      const elements = obj['elements'] as Record<string, unknown>[];
      instance.elements = elements.map((element) =>
        AuthzDetailsElement.parse(element)
      );
    }
    return instance;
  }
}
