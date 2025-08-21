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
    const { customerId, returnUrl } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Create a customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl || `${req.headers.origin}/the-turn/dashboard`
    });

    res.status(200).json({
      url: portalSession.url
    });
  } catch (error) {
    console.error("Stripe customer portal error:", error);

    if (error.type === "StripeInvalidRequestError") {
      return res.status(400).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: "Failed to create customer portal session",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
}
