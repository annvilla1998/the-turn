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
    const { email, name, userId } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if customer already exists
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1
    });

    let customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log("Found existing customer:", customer.id);
    } else {
      // Create new customer
      customer = await stripe.customers.create({
        email: email,
        name: name,
        metadata: {
          userId: userId // Store your app's user ID
        }
      });
      console.log("Created new customer:", customer.id);
    }

    res.status(200).json({
      customerId: customer.id,
      email: customer.email,
      name: customer.name
    });
  } catch (error) {
    console.error("Stripe customer error:", error);

    if (error.type === "StripeCardError") {
      return res.status(400).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: "Failed to create/retrieve customer",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
}
