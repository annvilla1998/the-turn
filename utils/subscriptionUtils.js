// Utility function to check if user has active memberships
export const checkActiveSubscriptions = async (stripeCustomerId) => {
  if (!stripeCustomerId) {
    return { hasActive: false, subscriptions: [] };
  }

  try {
    const response = await fetch(
      `/api/stripe/customer-data?customerId=${stripeCustomerId}`
    );

    if (response.ok) {
      const data = await response.json();
      const activeSubscriptions =
        data.subscriptions?.filter(
          (sub) => sub.status === "active" || sub.status === "trialing"
        ) || [];

      return {
        hasActive: activeSubscriptions.length > 0,
        subscriptions: activeSubscriptions,
        customerData: data
      };
    }

    return { hasActive: false, subscriptions: [] };
  } catch {
    // Error checking subscriptions
    return { hasActive: false, subscriptions: [] };
  }
};
