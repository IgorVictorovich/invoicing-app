import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { Invoice } from '../model/invoice';
import { InvoiceItem } from '../model/invoice-item';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../model/customer';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

const HOST = environment.javascriptInvoicesServiceHost;
const API_CUSTOMERS = environment.apiCustomers;
const API_PRODUCTS = environment.apiProducts;
const API_INVOICES = environment.apiInvoices;
const API_INVOICE_ITEMS = environment.apiInvoiceItems;

@Injectable()
export class InvoiceService {

  public static findCustomerById(id: number, customers: Array<Customer>): Customer {
    return customers.find((c) => {
      return c.id === id;
    });
  }

  public static getUniqueItems(arr: Array<any>): Array<any> {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    arr = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }

    return arr;
  }

  constructor(private service: HttpService) {
  }

  private getContacts(contactIdList: string[]) {
    contactIdList = InvoiceService.getUniqueItems(contactIdList);

    return Observable
      .forkJoin(
        contactIdList.map(
          contactId => this.service.get(`${HOST}${API_CUSTOMERS}/${contactId}`).map(response => response.json())
        )
      );
  }

  public getInvoices() {
    return Observable
      .forkJoin([
        this.service.get(`${HOST}${API_INVOICES}`).map(response => response.json())
      ])
      .flatMap(
        (results) => {
          const customers = results[0].map((i) => {
            return i.customer_id;
          });
          return this.getContacts(customers).flatMap(
            (contacts) => {
              return results[0].map((invoice) => {
                return new Invoice(
                  invoice.customer_id,
                  invoice.discount,
                  invoice.total,
                  InvoiceService.findCustomerById(invoice.customer_id, contacts).name,
                  null,
                  invoice.id);
              });
            }
          );
        }
      );
  }

  public getProducts() {
    return this.service.get(`${HOST}${API_PRODUCTS}`);
  }

  public getCustomers() {
    return this.service.get(`${HOST}${API_CUSTOMERS}`);
  }

  public getCustomerById(id: number) {
    return this.service.get(`${HOST}${API_CUSTOMERS}/${id}`);
  }

  public setInvoice(invoice: Invoice): void {
    this.service.post(`${HOST}${API_INVOICES}`, JSON.stringify(invoice))
      .subscribe((resp) => {
        if (resp.status === 200) {
          for (let i = 0; i < invoice.invoice_items.length; i++) {
            this.setInvoiceItem(invoice.invoice_items[i]);
          }
        } else {
          console.error(JSON.stringify(resp));
          throw resp;
        }
      });
  }

  public setInvoiceItem(invoiceItem: InvoiceItem) {
    this.service.post(`${HOST}${API_INVOICES}/${invoiceItem.invoice_id}${API_INVOICE_ITEMS}`, JSON.stringify(invoiceItem))
      .subscribe((resp) => {
        if (resp.status !== 200) {
          console.error(JSON.stringify(resp));
          throw resp;
        }
      });
  }

}
