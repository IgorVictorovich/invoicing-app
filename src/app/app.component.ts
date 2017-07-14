import { Component } from '@angular/core';
import { InvoiceService } from './services/invoice.service';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService, InvoiceService]
})
export class AppComponent {
}
