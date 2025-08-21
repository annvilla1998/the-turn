import Stripe from "stripe";

// Initialize Stripe with your secret key
let stripe;

try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "Stripe secret key not configured. Check your .env.local file."
    );
  }
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.error("Stripe initialization error:", error.message);
  stripe = null;
}

export default stripe;
