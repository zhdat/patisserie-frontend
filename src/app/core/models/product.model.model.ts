export interface ProductModel {
    id?: number;
    name: number;
    description: string;
    active: boolean;
    variants: Variant[];
    allergens: string[];
    categories: string[];
}

export interface Variant {
    id?: number;
    name: string;
    price: number;
}

export interface CreateProductRequest {
    name: string;
    description: string;
}
