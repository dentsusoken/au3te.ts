import { stringify } from 'node:querystring';

export default class URLCoder {
  static encode(input: string): string {
    try {
      console.log(input);

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
    if (!Object.keys(parameters).length) {
      return;
    }

    return stringify(parameters);
  }
}
