import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../model/customer';
import { InvoiceService } from '../services/invoice.service';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { Product } from '../model/product';
import { Invoice } from '../model/invoice';

const ALERT_HIDE_TIMEOUT = 5 * 1000;

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html'
})
export class InvoiceFormComponent implements OnInit {

  private totalPrice: number;

  @Input() inputArray: ArrayType[];
  public invoiceForm: FormGroup;

  public customers: Array<Customer>;

  public products: Array<Product>;

  public saved: boolean;

  public showSavedAlert: boolean;

  public showErrorAlert: boolean;

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.populateCustomers();
    this.populateProducts();
  }

  private populateCustomers() {
    this.invoiceService.getCustomers().subscribe((resp) => {
      if (resp.status !== 200) {
        console.log(JSON.stringify(resp));
        return;
      }

      this.customers = resp.json();
    });
  }

  private populateProducts() {
    this.invoiceService.getProducts().subscribe((resp) => {
      if (resp.status !== 200) {
        console.log(JSON.stringify(resp));
        return;
      }

      this.products = resp.json();
    });
  }

  private initProductsGroup() {
    return this.fb.group({
      product: [null, Validators.required],
      quantity: [null, Validators.required]
    });
  }

  private getInvoiceModel(): Invoice {
    const cnum = parseInt(this.invoiceForm.value.customer, 10);
    const customer = this.customers.find((c) => {
      return c.id === cnum;
    });
    const invoice = new Invoice(
      cnum,
      this.invoiceForm.value.discount,
      this.totalPrice,
      customer && customer.name
    );
    const invoiceItems = Invoice.getInvoiceItems(invoice.id, this.invoiceForm.value.products);
    invoice.setInvoiceItems(invoiceItems);

    return invoice;
  }

  private successAlert(): void {
    this.saved = true;
    this.showSavedAlert = true;
    setTimeout(() => {
      this.showSavedAlert = false;
    }, ALERT_HIDE_TIMEOUT);
  }

  private errorAlert(): void {
    this.saved = false;
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert = false;
    }, ALERT_HIDE_TIMEOUT);
  }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      customer: [null, [Validators.required]],
      products: this.fb.array([
        this.initProductsGroup()
      ]),
      discount: [null, [Validators.required]],
      total: new FormControl({value: 0, disabled: true})
    });
  }

  public addProductGroup() {
    const control = <FormArray>this.invoiceForm.controls['products'];
    control.push(this.initProductsGroup());
  }

  public removeProductGroup(i: number) {
    const control = <FormArray>this.invoiceForm.controls['products'];
    control.removeAt(i);
  }

  public getTotalValue(): number {
    let calculatedValue = 0.00;

    if (this.invoiceForm.valid) {
      const discount = this.invoiceForm.value.discount;
      const productIds = this.invoiceForm.value.products;

      const totalPrice = Product.getProductsTotalPrice(productIds, this.products);
      calculatedValue = Invoice.getPriceWithDiscount(discount, totalPrice);
    }
    this.totalPrice = calculatedValue;
    return calculatedValue;
  }

  public save() {
    if (!this.invoiceForm.valid) {
      return;
    }
    try {
      this.invoiceService.setInvoice(this.getInvoiceModel());
      this.successAlert();
    } catch (ex) {
      console.error(ex);
      this.errorAlert();
    }
  }
}

