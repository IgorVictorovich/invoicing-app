import { NgModule } from '@angular/core';

import { routing } from './customers.lazy.routing';

import { CustomersComponent } from '../component/customers.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [routing, CommonModule],
  declarations: [CustomersComponent]
})
export class CustomersModule {
}
