import { NgModule } from '@angular/core';

import { routing } from './products.lazy.routing';

import { ProductsComponent } from '../component/products.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [routing, CommonModule],
  declarations: [ProductsComponent]
})
export class ProductsModule {
}
