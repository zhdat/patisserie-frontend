import { Routes } from '@angular/router';

export const routes: Routes = [
  // --- Espace publique ---
  {
    path: '',
    loadComponent: () => import('./features/public/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'boutique',
    loadComponent: () => import('./features/public/shop/shop.component').then((m) => m.ShopComponent),
  },
  {
    path: 'panier',
    loadComponent: () => import('./features/public/cart/cart.component').then((m) => m.CartComponent),
  },

  // --- Espace Admin ---
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'admin/catalogue',
    loadComponent: () =>
      import('./features/admin/catalog/catalog').then((m) => m.Catalog),
  },
  {
    path: 'admin/commandes',
    loadComponent: () => import('./features/admin/orders/orders').then((m) => m.Orders),
  },
];
