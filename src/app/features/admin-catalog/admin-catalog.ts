import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-admin-catalog',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './admin-catalog.html',
  styleUrl: './admin-catalog.css',
})
export class AdminCatalog implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  // Création du formulaire avec validation
  productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
  });

  isSubmitting = false;
  successMessage = '';

  products = this.productService.products;

  ngOnInit() {
    this.productService.loadProducts();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      this.successMessage = '';

      // On récupère les valeurs du formulaire et on appelle le back-end
      this.productService.createProduct(this.productForm.getRawValue()).subscribe({
        next: (createdProduct) => {
          this.successMessage = `Le produit "${createdProduct.name}" a été créé avec succès !`;
          this.productForm.reset(); // On vide le formulaire
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Erreur lors de la création du produit', err);
          this.isSubmitting = false;
        },
      });
    }
  }
}
