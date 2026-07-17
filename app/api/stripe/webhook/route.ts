export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  // Lazy-load Stripe to avoid build-time failures
  const StripeModule = await import("stripe");
  const Stripe = StripeModule.default;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook signature failed" }, { status: 400 });
  }

  // Only import Supabase if configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.log("Supabase not configured; skipping webhook DB updates");
    return NextResponse.json({ received: true });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id || session.metadata?.userId;

      if (!userId) break;

      if (session.mode === "subscription") {
        await supabase
          .from("profiles")
          .update({
            subscription_tier: "pro",
            credits: -1, // -1 = unlimited
          })
          .eq("id", userId);
      }

      if (session.mode === "payment") {
        const { data } = await supabase
          .from("profiles")
          .select("credits")
          .eq("id", userId)
          .single();

        await supabase
          .from("profiles")
          .update({ credits: (data?.credits || 0) + 50 })
          .eq("id", userId);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single();

      if (data) {
        await supabase
          .from("profiles")
          .update({ subscription_tier: "free", credits: 3 })
          .eq("id", data.id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
