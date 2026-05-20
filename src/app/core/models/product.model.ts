export interface ProductModel {
  id?: number;
  name: string;
  description: string;
  active: boolean;
  variants: VariantModel[];
  allergens: string[];
  categories: string[];
}

export interface VariantModel {
  id?: number;
  name: string;
  price: number;
}

export interface CreateProductRequestModel {
  name: string;
  description: string;
}

export interface CartItemModel {
  product: ProductModel;
  quantity: number;
}
