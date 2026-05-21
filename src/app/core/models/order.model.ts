export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface ClickAndCollectOrderRequest {
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  pickupDate: string;
  items: OrderItemRequest[]; // On le laisse pour la suite, même si ton back-end actuel ne l'exploite peut-être pas encore !
}
