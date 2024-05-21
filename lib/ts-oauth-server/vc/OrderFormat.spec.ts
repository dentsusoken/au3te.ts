import { describe, expect, it } from 'vitest';
import { MdocOrderProcessor } from './MdocOrderProcessor';
import { OrderFormat } from './OrderFormat';

describe('OrderFormat', () => {
  it('should return the correct processor for MDOC format', () => {
    const orderFormat = OrderFormat.byId('mso_mdoc');
    expect(orderFormat.getProcessor()).toBeInstanceOf(MdocOrderProcessor);
  });

  it('should return undefined for an invalid format', () => {
    const orderFormat = OrderFormat.byId('invalid_format');
    expect(orderFormat).toBeUndefined();
  });
});
