import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  activeProducts = computed(() => {
    return this.productService.products().filter((product) => product.active);
  });

  addToCart(product: ProductModel): void {
    this.cartService.addToCart(product)
  }
}
