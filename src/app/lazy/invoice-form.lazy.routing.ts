import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceFormComponent } from '../component/invoice-form.component';

const routes: Routes = [
  {path: '', component: InvoiceFormComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
