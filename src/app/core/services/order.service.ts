import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClickAndCollectOrderRequest } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = "http://localhost:8080/api/orders/click-and-collect";

  createOrder(request: ClickAndCollectOrderRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }
}
