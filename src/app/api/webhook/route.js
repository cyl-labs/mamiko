import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const buffer = await req.arrayBuffer();
  const body = Buffer.from(buffer);
  const signature = req.headers.get("stripe-signature");
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customer = await stripe.customers.retrieve(session.customer);

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const { insertOrderError } = await supabase.from("Orders").insert({
        stripe_session_id: session.id,
        email: customer.email,
        total: session.amount_total,
        items: lineItems.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
          price: item.amount_total,
        })),
        uid: session.metadata.uid,
      });

      if (insertOrderError) {
        console.error(insertError.message);
      } else {
        const { clearCartError } = await supabase
          .from("Carts")
          .update({ items: [] })
          .eq("uid", session.metadata.uid);

        if (clearCartError) {
          console.error(clearCartError.message);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return NextResponse.json({ received: true });
}
