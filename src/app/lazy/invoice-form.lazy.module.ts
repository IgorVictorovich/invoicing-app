import { NgModule } from '@angular/core';

import { routing } from './invoice-form.lazy.routing';

import { InvoiceFormComponent } from '../component/invoice-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    routing,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [InvoiceFormComponent]
})
export class InvoiceFormModule {
}
