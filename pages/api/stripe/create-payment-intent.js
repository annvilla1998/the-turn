import stripe from "@/lib/stripeServer";

export default async function handler(req, res) {
  if (!stripe) {
    return res.status(500).json({
      error: "Stripe not properly configured. Check server logs."
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, metadata } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents for Stripe
      currency: "usd",
      metadata: metadata || {},
      // Add automatic payment methods
      automatic_payment_methods: {
        enabled: true
      }
    });

    // Send the client secret to the client
    res.status(200).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    // Log error safely
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
}
