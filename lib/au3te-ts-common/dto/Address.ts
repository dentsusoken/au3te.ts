export class Address {
  private formatted?: string;
  private street_address?: string;
  private locality?: string;
  private region?: string;
  private postal_code?: string;
  private country?: string;

  public getFormatted(): string | undefined {
    return this.formatted;
  }
  public setFormatted(formatted: string) {
    this.formatted = formatted;
    return this;
  }
  public getStreetAddress(): string | undefined {
    return this.street_address;
  }
  public setStreetAddress(street_address: string) {
    this.street_address = street_address;
    return this;
  }
  public getLocality(): string | undefined {
    return this.locality;
  }
  public setLocality(locality: string) {
    this.locality = locality;
    return this;
  }
  public getRegion(): string | undefined {
    return this.region;
  }
  public setRegion(region: string) {
    this.region = region;
    return this;
  }
  public getPostalCode(): string | undefined {
    return this.postal_code;
  }
  public setPostalCode(postal_code: string) {
    this.postal_code = postal_code;
    return this;
  }
  public getCountry(): string | undefined {
    return this.country;
  }
  public setCountry(country: string) {
    this.country = country;
    return this;
  }
}
