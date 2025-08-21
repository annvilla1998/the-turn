#!/usr/bin/env node

/**
 * Script to create Stripe products and prices for memberships
 * Run this script to set up your membership plans in Stripe
 */

import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Import the centralized Stripe initialization
import stripe from "../lib/stripeServer.js";

if (!stripe) {
  console.error(
    "❌ Stripe not properly configured. Check your .env.local file."
  );
  process.exit(1);
}

const membershipPlans = [
  {
    name: "Basic Membership",
    description: "1 hour session per month",
    amount: 4000, // $40.00 in cents
    hours: 40,
    sessionLength: 1
  },
  {
    name: "Premium Membership",
    description: "3 hour session per month",
    amount: 10000, // $100.00 in cents
    hours: 100,
    sessionLength: 3
  },
  {
    name: "Elite Membership",
    description: "5 hour session per month",
    amount: 15000, // $150.00 in cents
    hours: 150,
    sessionLength: 5
  }
];

async function createMembershipProducts() {
  console.log("Creating Stripe products and prices for memberships...\n");

  for (const plan of membershipPlans) {
    try {
      // Create product
      const product = await stripe.products.create({
        name: plan.name,
        description: plan.description,
        metadata: {
          hours: plan.hours.toString(),
          sessionLength: plan.sessionLength.toString(),
          type: "membership"
        }
      });

      // Create recurring price
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.amount,
        currency: "usd",
        recurring: {
          interval: "month"
        },
        metadata: {
          hours: plan.hours.toString(),
          sessionLength: plan.sessionLength.toString()
        }
      });

      console.log(`✅ Created ${plan.name}`);
      console.log(`   Product ID: ${product.id}`);
      console.log(`   Price ID: ${price.id}`);
      console.log(`   Amount: $${plan.amount / 100}/month\n`);
    } catch (error) {
      console.error(`❌ Error creating ${plan.name}:`, error.message);
    }
  }
}

createMembershipProducts()
  .then(() => {
    console.log("\n🎉 All membership products created successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
