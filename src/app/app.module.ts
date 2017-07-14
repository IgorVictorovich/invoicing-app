import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './component/invoices.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: './lazy/products.lazy.module#ProductsModule'
  },
  {
    path: 'customers',
    loadChildren: './lazy/customers.lazy.module#CustomersModule'
  },
  {
    path: 'new-invoice',
    loadChildren: './lazy/invoice-form.lazy.module#InvoiceFormModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
