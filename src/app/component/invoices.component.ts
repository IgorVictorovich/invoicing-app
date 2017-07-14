import { Component, OnInit } from '@angular/core';
import { Invoice } from '../model/invoice';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {

  public invoices: Array<Invoice> = [];

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.invoiceService.getInvoices()
      .subscribe(
        (data: Invoice) => this.invoices.push(data),
        error => console.error(error)
      );
  }

}
