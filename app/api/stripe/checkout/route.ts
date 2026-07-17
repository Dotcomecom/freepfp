export const dynamic = "force-dynamic";

import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const stripe = await getStripe();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: "price_1234567890", quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
  });

  return Response.json({ url: session.url });
}
