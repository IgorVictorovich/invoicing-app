import { Injectable } from '@angular/core';
import { InvoiceItem } from './invoice-item';
import { ProductCart } from './product';

@Injectable()
export class Invoice {

  public static getPriceWithDiscount(discount: number, price: number): number {
    return price - (price * (discount / 100));
  }

  public static getInvoiceItems(invoiceId: number, productCarts: Array<ProductCart>): Array<InvoiceItem> {
    const result: Array<InvoiceItem> = [];

    for (let i = 0; i < productCarts.length; i++) {
      let itemId = i;
      result.push(new InvoiceItem(invoiceId, parseInt(productCarts[i].product, 10), productCarts[i].quantity, ++itemId));
    }
    return result;
  }

  constructor(public customer_id: number,
              public discount: number,
              public total: number,
              public customer_name?: string,
              public invoice_items?: Array<InvoiceItem>,
              public id?: number) {
    this.id = this.id || this.getGeneratedId();
  }

  private getGeneratedId(): number {
    return Math.floor((Math.random() * 10) + 1);
  }

  public setInvoiceItems(items: Array<InvoiceItem>): void {
    this.invoice_items = items;
  }

}
