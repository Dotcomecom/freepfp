import type Stripe from "stripe";

// Lazy Stripe initialization - only initializes when actually used at runtime
let stripeInstance: Stripe | null = null;

export async function getStripe() {
  if (stripeInstance) return stripeInstance;
  
  const Stripe = (await import("stripe")).default;
  stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });
  
  return stripeInstance;
}

export async function createCheckoutSession(
  priceId: string,
  userId: string,
  mode: "subscription" | "payment" = "subscription"
) {
  const stripe = await getStripe();

  // Create a Checkout Session for the given price
  const session = await stripe.checkout.sessions.create({
    mode: mode === "subscription" ? "subscription" : "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    client_reference_id: userId,
    metadata: {
      userId,
    },
  });

  return { sessionId: session.id, url: session.url };
}

export async function createPortalSession(customerId: string) {
  const stripe = await getStripe();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return { url: session.url };
}
