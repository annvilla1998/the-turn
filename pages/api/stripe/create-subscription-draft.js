import stripe from "@/lib/stripeServer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customerId, priceId, customerEmail, metadata } = req.body;

    if (!priceId) {
      return res.status(400).json({
        error: "Missing required field: priceId"
      });
    }

    let customer = customerId;

    // Create customer if not provided
    if (!customer && customerEmail) {
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        metadata: metadata || {}
      });
      customer = newCustomer.id;
    }

    if (!customer) {
      return res.status(400).json({
        error: "Customer ID or email is required"
      });
    }

    // Create a subscription in "incomplete" status that will appear in Customer Portal
    const subscription = await stripe.subscriptions.create({
      customer: customer,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription"
      },
      metadata: metadata || {}
    });

    return res.json({
      success: true,
      subscriptionId: subscription.id,
      customerId: customer,
      status: subscription.status
    });
  } catch (error) {
    console.error("Error creating subscription draft:", error);
    return res.status(500).json({
      error: "Failed to create subscription draft",
      details: error.message
    });
  }
}
