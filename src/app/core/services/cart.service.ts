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

  // Diminuer la quantité ou supprimer si on tombe à 0
  removeFromCart(productId: number | undefined): void {
    if (!productId) return;
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        // On diminue la quantité
        return items.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        );
      } else {
        // On supprime complètement l'article
        return items.filter((item) => item.product.id !== productId);
      }
    });
  }

  // Supprimer un article d'un coup, peu importe la quantité
  deleteItem(productId: number | undefined): void {
    if (!productId) return;
    this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
