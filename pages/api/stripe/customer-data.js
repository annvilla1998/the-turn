import stripe from "@/lib/stripeServer";

export default async function handler(req, res) {
  if (!stripe) {
    return res.status(500).json({
      error: "Stripe not properly configured. Check server logs."
    });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Get customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
      expand: ["data.items.data.price"]
    });

    // Get customer details
    const customer = await stripe.customers.retrieve(customerId);

    // Format subscription data and get product details
    const formattedSubscriptions = await Promise.all(
      subscriptions.data.map(async (sub) => {
        const items = await Promise.all(
          sub.items.data.map(async (item) => {
            // Get product details separately since we can't expand 4 levels
            const product = await stripe.products.retrieve(item.price.product);

            return {
              id: item.id,
              price: {
                id: item.price.id,
                amount: item.price.unit_amount,
                currency: item.price.currency,
                interval: item.price.recurring?.interval
              },
              product: {
                id: product.id,
                name: product.name,
                description: product.description
              }
            };
          })
        );

        return {
          id: sub.id,
          status: sub.status,
          current_period_start: new Date(sub.current_period_start * 1000),
          current_period_end: new Date(sub.current_period_end * 1000),
          cancel_at_period_end: sub.cancel_at_period_end,
          created: new Date(sub.created * 1000),
          items: items
        };
      })
    );

    res.status(200).json({
      customer: {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        created: new Date(customer.created * 1000)
      },
      subscriptions: formattedSubscriptions
    });
  } catch (error) {
    console.error("Stripe customer data error:", error);

    if (error.type === "StripeInvalidRequestError") {
      return res.status(400).json({
        error: error.message
      });
    }

    res.status(500).json({
      error: "Failed to retrieve customer data",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
}
