import { Injectable } from '@angular/core';

@Injectable()
export class InvoiceItem {
  constructor(public invoice_id: number,
              public product_id: number,
              public quantity: number,
              public id?: number) {
    this.id = this.getId();
  }

  private getId(): number {
    return this.id || this.getGeneratedId();
  }

  private getGeneratedId(): number {
    return Math.floor((Math.random() * 10) + 1);
  }
}







