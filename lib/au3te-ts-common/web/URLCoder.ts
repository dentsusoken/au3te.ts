// import { stringify } from 'node:querystring';

export default class URLCoder {
  static encode(input: string): string {
    try {
      return encodeURIComponent(input).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    } catch (e) {
      // This never happens.
      return input;
    }
  }

  static decode(input: string): string {
    try {
      return decodeURIComponent(input);
    } catch (e) {
      // This never happens.
      return input;
    }
  }

  static formUrlEncode(
    parameters: Record<string, string | string[] | undefined>
  ): string | undefined {
    const searchParams = new URLSearchParams();
    if (!Object.keys(parameters).length) {
      return;
    }
    for (const key in parameters) {
      const value = parameters[key];
      if (value) {
        if (Array.isArray(value)) {
          for (const v of value) {
            searchParams.append(key, v);
          }
        } else {
          searchParams.append(key, value);
        }
      }
    }
    return searchParams.toString();
    // return stringify(parameters);
  }
}
