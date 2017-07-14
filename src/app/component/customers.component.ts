import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  public customers: Array<Customer>;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.invoiceService.getCustomers()
      .subscribe((resp) => {
        if (resp.status === 200) {
          this.customers = resp.json();
        }
      });
  }
}

