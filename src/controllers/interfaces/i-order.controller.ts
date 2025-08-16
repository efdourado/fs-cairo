import { Order } from "@prisma/client";
import { CreateOrderDTO } from "@/dtos/order.dto";
import { StripeCheckoutDTO } from "@/dtos/payment.dto";
import { OrderWithDetails } from "@/persistence/daos/interfaces/i-order.dao";
import Stripe from "stripe";

export interface IOrderController {
  createOrder(dto: CreateOrderDTO): Promise<{ success: boolean; order?: Order; message?: string }>;
  createStripeCheckout(dto: StripeCheckoutDTO): Promise<{ success: boolean; sessionId?: string; message?: string; }>;
  handleStripeWebhook(event: Stripe.Event): Promise<{ success: boolean; order?: Order & { restaurant: { slug: string } }; message?: string; }>;
  getOrdersByCpf(cpf: string): Promise<{ success: boolean; orders: OrderWithDetails[]; message?: string; }>;
}