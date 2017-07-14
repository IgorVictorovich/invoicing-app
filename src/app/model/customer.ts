import { Injectable } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';

@Injectable()
export class Customer {
  public id: number;
  public name: string;
  public address: string;
  public phone: string;
}
