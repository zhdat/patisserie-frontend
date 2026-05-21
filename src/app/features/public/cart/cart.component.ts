import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ProductModel } from '../../../core/models/product.model';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, ReactiveFormsModule],
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly fb = inject(FormBuilder);

  // On récupère les signaux du service
  cartItems = this.cartService.cartItems;
  totalItems = this.cartService.totalItems;

  // État de l'interface
  showCheckoutForm = false;
  isSubmitting = false;
  orderSuccess = false;

  // Formulaire client
  checkoutForm = this.fb.nonNullable.group({
    clientFirstName: ['', [Validators.required, Validators.minLength(2)]],
    clientLastName: ['', [Validators.required, Validators.minLength(2)]],
    clientEmail: ['', [Validators.required, Validators.email]],
    clientPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    pickupDate: ['', [Validators.required]],
  });

  addOne(product: ProductModel): void {
    this.cartService.addToCart(product);
  }

  removeOne(productId: number | undefined): void {
    this.cartService.removeFromCart(productId);
  }

  deleteItem(productId: number | undefined): void {
    this.cartService.deleteItem(productId);
  }

  toggleCheckout(): void {
    this.showCheckoutForm = true;
  }

  submitOrder(): void {
    if (this.checkoutForm.valid && this.cartItems().length > 0) {
      this.isSubmitting = true;

      // 1. Préparation du payload pour le backend
      const formValues = this.checkoutForm.getRawValue();
      const request = {
        clientFirstName: formValues.clientFirstName,
        clientLastName: formValues.clientLastName,
        clientEmail: formValues.clientEmail,
        clientPhone: formValues.clientPhone,
        pickupDate: formValues.pickupDate + ':00',
        items: this.cartItems().map((item) => ({
          productId: item.product.id!,
          quantity: item.quantity,
        })),
      };

      // 2. Envoi à l'API
      this.orderService.createOrder(request).subscribe({
        next: () => {
          this.orderSuccess = true;
          this.cartService.clearCart();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Erreur lors de la commande', err);
          alert('Une erreur est survenue lors de la validation de votre commande.');
          this.isSubmitting = false;
        },
      });
    }
  }
}
