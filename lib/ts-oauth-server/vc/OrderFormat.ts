import { MdocOrderProcessor } from './MdocOrderProcessor';
import { OrderProcessor } from './OrderProcessor';

export class OrderFormat {
  // public static readonly SD_JWT = new OrderFormat('vc+sd-jwt',new SdJwtOrderProcessor());
  public static readonly MDOC = new OrderFormat(
    'mso_mdoc',
    new MdocOrderProcessor()
  );

  private static values = [
    // OrderFormat.SD_JWT,
    OrderFormat.MDOC,
  ];

  private constructor(
    private readonly id: string,
    private processer: OrderProcessor
  ) {}

  getProcessor(): OrderProcessor {
    return this.processer;
  }

  static byId(id: string): OrderFormat {
    return this.values.filter((format) => format.id === id)[0] || undefined;
  }
}
