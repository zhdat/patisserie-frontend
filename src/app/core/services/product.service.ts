import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CreateProductRequestModel, ProductModel } from '../models/product.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/products';

  products = signal<ProductModel[]>([]);

  createProduct(request: CreateProductRequestModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.apiUrl, request).pipe(
      tap((newProduct) => {
        this.products.update((currentProducts) => [...currentProducts, newProduct]);
      }),
    );
  }

  loadProducts(): void {
    this.http.get<ProductModel[]>(this.apiUrl).subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Erreur chargement', err),
    });
  }
}
