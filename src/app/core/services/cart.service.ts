import { computed, Injectable, signal } from '@angular/core';
import { CartItemModel, ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItemModel[]>([]);

  totalItems = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  addToCart(product: ProductModel): void {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...items, { product, quantity: 1 }];
      }
    });
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
