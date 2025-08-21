import { buffer } from "micro";
// import crypto from "crypto";
import stripe from "@/lib/stripeServer";

// Set the Stripe secret from your Stripe dashboard
const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    const buf = await buffer(req);
    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, stripeSecret);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Process the webhook event (e.g., payment success)
    if (event.type === "invoice.paid") {
      const paymentIntent = event.data.object;
      console.log("Invoice paid:", paymentIntent);
    }
    // Acknowledge receipt of the webhook
    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
export const config = {
  api: {
    bodyParser: false // Disable body parsing to handle raw requests for signature verification
  }
};
