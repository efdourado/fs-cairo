import { IPaymentService } from "./interfaces/i-payment.service";
import { StripeCheckoutDTO } from "@/dtos/payment.dto";
import { IProductDAO } from "@/persistence/daos/interfaces/i-product.dao";
import { IOrderDAO } from "@/persistence/daos/interfaces/i-order.dao";
import Stripe from "stripe";
import { headers } from "next/headers";
import { removeCpfPunctuation } from "@/app/[slug]/menu/helpers/cpf";
import { Order } from "@prisma/client";

export class PaymentService implements IPaymentService {
  private stripe: Stripe;

  constructor(private productDAO: IProductDAO, private orderDAO: IOrderDAO) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("Missing Stripe secret key");
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-06-30.basil",
  }); }

  async createStripeCheckout({
    orderId,
    products,
    slug,
    orderType,
    cpf,
  }: StripeCheckoutDTO): Promise<{ sessionId: string }> {
    const origin = (await headers()).get("origin") as string;

    const productsFromDb = await this.productDAO.findManyByIds(
      products.map((product) => product.id),
    );

    const searchParams = new URLSearchParams();
    searchParams.set("orderType", orderType);
    searchParams.set("cpf", removeCpfPunctuation(cpf));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
      cancel_url: `${origin}/${slug}/orders?${searchParams.toString()}`,
      metadata: {
        orderId: String(orderId),
      },
      line_items: products.map((product) => {
        const productFromDb = productsFromDb.find((p) => p.id === product.id);
        return {
          price_data: {
            currency: "brl",
            product_data: {
              name: product.name,
              images: [product.imageUrl],
            },
            unit_amount: (productFromDb?.price ?? 0) * 100,
          },
          quantity: product.quantity,
    }; }), });

    if (!session.id) {
      throw new Error("Failed to create Stripe session.");
    }

    return { sessionId: session.id };
  }

  async handleWebhook(event: Stripe.Event): Promise<{
    received: boolean;
    order?: Order & { restaurant: { slug: string } };
  }> {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) return { received: true };

      const order = await this.orderDAO.updateStatus(
        Number(orderId),
        "PAYMENT_CONFIRMED",
      );
      return { received: true, order };
    } else if (event.type === "charge.failed") {
      const charge = event.data.object as Stripe.Charge;
      const orderId = charge.metadata?.orderId;
      if (!orderId) return { received: true };

      const order = await this.orderDAO.updateStatus(
        Number(orderId),
        "PAYMENT_FAILED",
      );
      return { received: true, order };
    }

    return { received: true };
} }