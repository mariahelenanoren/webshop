import { Delivery } from "./components/DeliveryForm";
import { User } from "./components/UserForm";
import { CartItem } from "./contexts/CartContext";
import { Card } from "./components/PaymentForm";

export interface Order {
  cart: CartItem[];
  user: User;
  payment: { option: string; info: Card | string };
  delivery: Delivery;
  cartCost: number;
  tax: number;
  orderId: string;
}

export async function sendOrderToApi(order: Order) {
  return new Promise((resolve) => {
    console.log(order);
    setTimeout(resolve, 1000);
  });
}
