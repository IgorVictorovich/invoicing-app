import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  public products: Array<Product>;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.invoiceService.getProducts()
      .subscribe((resp) => {
        if (resp.status === 200) {
          this.products = resp.json();
        }
      });
  }
}
