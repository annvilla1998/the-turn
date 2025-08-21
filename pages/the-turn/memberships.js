import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import ProtectedRoute from "@/components/protected-route";
import {
  List,
  ListItem,
  Stack,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  CircularProgress,
  Alert
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Define membership plans - in a real app, you'd get these from your Stripe products
const membershipPlans = [
  {
    id: "basic",
    name: "Basic Membership",
    price: 40,
    hours: 40,
    sessionLength: 1,
    description: "Perfect for occasional players",
    features: ["1 hour per month", "Member-only events access"],
    priceId: "price_1RvnVSAn0IJ9vp0uMRbtoLOW" // Real Stripe Price ID for Basic
  },
  {
    id: "premium",
    name: "Premium Membership",
    price: 100,
    hours: 100,
    sessionLength: 3,
    description: "Great for regular players",
    features: ["3 hours per month", "Member-only events access"],
    priceId: "price_1RvnVSAn0IJ9vp0u8zrqesVy" // Real Stripe Price ID for Premium
  },
  {
    id: "elite",
    name: "Elite Membership",
    price: 150,
    hours: 150,
    sessionLength: 5,
    description: "For serious golf enthusiasts",
    features: [
      "5 hours per month",
      "Member-only events access",
      "Personal coaching sessions"
    ],
    priceId: "price_1RvnVTAn0IJ9vp0u68xJK11p" // Real Stripe Price ID for Elite
  }
];

export default function Membership() {
  const { user } = useSelector((state) => state);
  const [stripeCustomerId, setStripeCustomerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get or create Stripe customer when component mounts
  useEffect(() => {
    const getStripeCustomer = async () => {
      if (user?.currentUser?.email) {
        try {
          const response = await fetch("/api/stripe/create-customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.currentUser.email,
              name:
                user.currentUser.name ||
                `${user.currentUser.first_name || ""} ${
                  user.currentUser.last_name || ""
                }`.trim(),
              userId: user.currentUser.id
            })
          });

          if (response.ok) {
            const customerData = await response.json();
            setStripeCustomerId(customerData.customerId);
          }
        } catch (error) {
          console.error("Error getting Stripe customer:", error);
        }
      }
    };

    getStripeCustomer();
  }, [user?.currentUser]);

  const handleSelectPlan = async (plan) => {
    if (!stripeCustomerId) {
      setError("Unable to process subscription. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First, create a subscription draft in Stripe
      const subscriptionResponse = await fetch(
        "/api/stripe/create-subscription-draft",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: stripeCustomerId,
            priceId: plan.priceId,
            customerEmail: user?.currentUser?.email,
            metadata: {
              membershipType: plan.id,
              membershipName: plan.name,
              hours: plan.hours.toString(),
              sessionLength: plan.sessionLength.toString()
            }
          })
        }
      );

      if (!subscriptionResponse.ok) {
        const errorData = await subscriptionResponse.json();
        throw new Error(errorData.error || "Failed to create subscription");
      }

      // Now redirect to Customer Portal where they can complete payment
      const portalResponse = await fetch("/api/stripe/customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: stripeCustomerId,
          returnUrl: window.location.href
        })
      });

      if (portalResponse.ok) {
        const portalData = await portalResponse.json();
        window.location.href = portalData.url;
      } else {
        setError("Unable to access billing portal. Please try again.");
      }
    } catch (error) {
      setError(
        error.message || "Unable to process subscription. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Box sx={{ py: 4 }}>
        <Stack spacing={4} alignItems="center" sx={{ mb: 6 }}>
          <Typography variant="h2" component="h1" textAlign="center">
            Choose Your Membership
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            maxWidth="600px"
          >
            Get access to member-only events, tournaments, and activities. All
            memberships are subject to blackout dates and terms of service.
          </Typography>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4} justifyContent="center">
          {membershipPlans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  position: "relative",
                  border: plan.popular ? 2 : 1,
                  borderColor: plan.popular ? "primary.main" : "divider",
                  "&:hover": {
                    boxShadow: 3
                  }
                }}
              >
                <CardContent
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {plan.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center",
                        mb: 1
                      }}
                    >
                      <Typography variant="h3" component="span" color="primary">
                        ${plan.price}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        /month
                      </Typography>
                    </Box>
                  </Box>

                  <List sx={{ mb: 3, flex: 1 }}>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <CheckCircleIcon
                          color="primary"
                          sx={{ mr: 1, fontSize: 20 }}
                        />
                        <Typography variant="body2">{feature}</Typography>
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loading || !stripeCustomerId}
                    sx={{ mt: "auto" }}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      `Select ${plan.name}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Select a plan to subscribe through Stripe's secure billing portal.
            You can manage your membership, payment methods, and billing history
            anytime.
          </Typography>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}

Membership.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
