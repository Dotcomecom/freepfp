export const dynamic = "force-dynamic";

import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const { credits, price, userId } = await req.json();

    if (!credits || !price) {
      return Response.json({ error: "Missing credits or price" }, { status: 400 });
    }

    const stripe = await getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} PFP Transformation Credits`,
              description: `Buy ${credits} AI profile picture transformations on freepfp.ai`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || req.headers.get("origin")}/transform?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || req.headers.get("origin")}/checkout`,
      metadata: {
        credits: String(credits),
        userId: userId || "",
      },
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return Response.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
