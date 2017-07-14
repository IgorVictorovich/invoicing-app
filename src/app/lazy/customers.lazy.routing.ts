import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from '../component/customers.component';

const routes: Routes = [
  {path: '', component: CustomersComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
