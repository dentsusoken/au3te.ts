// TODO Authorization Endpoint
export class Address {
  private formatted?: string;
  private street_address?: string;
  private locality?: string;
  private region?: string;
  private postal_code?: string;
  private country?: string;

  public setCountry(country: string): Address {
    this.country = country;
    return this;
  }
  public setLocality(locality: string): Address {
    this.locality = locality;
    return this;
  }
  public setStreetAddress(streetAddress: string): Address {
    this.street_address = streetAddress;
    return this;
  }
  public setPostaCode(postalCode: string): Address {
    this.postal_code = postalCode;
    return this;
  }
  public setRegion(region: string): Address {
    this.region = region;
    return this;
  }
}
