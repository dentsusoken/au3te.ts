export class AuthzDetailsElement {
  private type?: string;
  private locations?: string[];
  private actions?: string[];
  private dataTypes?: string[];
  private identifier?: string;
  private privileges?: string[];
  private otherFields?: string;

  public getType(): string | undefined {
    return this.type;
  }

  public setType(type: string): AuthzDetailsElement {
    this.type = type;
    return this;
  }

  public getLocations(): string[] | undefined {
    return this.locations;
  }

  public setLocations(locations: string[]): AuthzDetailsElement {
    this.locations = locations;
    return this;
  }

  public getActions(): string[] | undefined {
    return this.actions;
  }

  public setActions(actions: string[]): AuthzDetailsElement {
    this.actions = actions;
    return this;
  }

  public getDataTypes(): string[] | undefined {
    return this.dataTypes;
  }

  public setDataTypes(dataTypes: string[]): AuthzDetailsElement {
    this.dataTypes = dataTypes;
    return this;
  }

  public getIdentifier(): string | undefined {
    return this.identifier;
  }

  public setIdentifier(identifier: string): AuthzDetailsElement {
    this.identifier = identifier;
    return this;
  }

  public getPrivileges(): string[] | undefined {
    return this.privileges;
  }

  public setPrivileges(privileges: string[]): AuthzDetailsElement {
    this.privileges = privileges;
    return this;
  }

  public getOtherFields(): string | undefined {
    return this.otherFields;
  }

  public setOtherFields(otherFields: string): AuthzDetailsElement {
    this.otherFields = otherFields;
    return this;
  }

  public getOtherFieldsAsMap(): Record<string, unknown> | undefined {
    if (!this.otherFields) {
      return;
    }
    return JSON.parse(this.otherFields);
  }

  public setOtherFieldsAsMap(
    otherFields: Record<string, unknown>
  ): AuthzDetailsElement {
    this.otherFields = otherFields ? JSON.stringify(otherFields) : '';
    return this;
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  public static fromJson(json: string): AuthzDetailsElement {
    const obj = JSON.parse(json);
    const instance = new AuthzDetailsElement();
    return instance
      .setType(obj.type)
      .setLocations(obj.locations)
      .setActions(obj.actions)
      .setDataTypes(obj.dataTypes)
      .setIdentifier(obj.identifier)
      .setPrivileges(obj.privileges)
      .setOtherFields(obj.otherFields);
  }

  static parse(obj: Record<string, unknown>) {
    const instance = new AuthzDetailsElement();
    if (obj['type']) {
      instance.type = obj['type'] as string;
    }
    if (obj['locations']) {
      instance.locations = obj['locations'] as string[];
    }
    if (obj['actions']) {
      instance.actions = obj['actions'] as string[];
    }
    if (obj['dataTypes']) {
      instance.dataTypes = obj['dataTypes'] as string[];
    }
    if (obj['identifier']) {
      instance.identifier = obj['identifier'] as string;
    }
    if (obj['privileges']) {
      instance.privileges = obj['privileges'] as string[];
    }
    if (obj['otherFields']) {
      instance.otherFields = obj['otherFields'] as string;
    }
    return instance;
  }
}
