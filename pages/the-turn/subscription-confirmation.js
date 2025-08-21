import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cart";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  CircularProgress
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import stripePromise from "@/lib/stripe";

export default function SubscriptionConfirmation() {
  const router = useRouter();
  const [status, setStatus] = useState("processing");
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkStatus = async () => {
      // Initialize Stripe
      const stripe = await stripePromise;

      if (!stripe) {
        setStatus("error");
        return;
      }

      // Retrieve the client secret from URL (can be setup intent or payment intent)
      const setupIntentSecret = new URLSearchParams(window.location.search).get(
        "setup_intent_client_secret"
      );
      const paymentIntentSecret = new URLSearchParams(
        window.location.search
      ).get("payment_intent_client_secret");

      if (!setupIntentSecret && !paymentIntentSecret) {
        setStatus("error");
        return;
      }

      try {
        let intent;

        if (setupIntentSecret) {
          // Handle setup intent completion
          const { setupIntent } =
            await stripe.retrieveSetupIntent(setupIntentSecret);
          intent = setupIntent;
        } else if (paymentIntentSecret) {
          // Handle payment intent completion
          const { paymentIntent } =
            await stripe.retrievePaymentIntent(paymentIntentSecret);
          intent = paymentIntent;
        }

        if (!intent) {
          setStatus("error");
          return;
        }

        switch (intent.status) {
          case "succeeded":
            // If it's a payment intent, we need to complete the subscription
            if (paymentIntentSecret && intent.metadata?.subscription_id) {
              try {
                const response = await fetch(
                  "/api/stripe/complete-subscription-payment",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      paymentIntentId: intent.id,
                      subscriptionId: intent.metadata.subscription_id
                    })
                  }
                );

                const result = await response.json();

                if (response.ok && result.success) {
                  setStatus("succeeded");
                  setSubscriptionDetails(result.subscription);
                  dispatch(clearCart());
                } else {
                  console.error(
                    "Failed to complete subscription:",
                    result.error
                  );
                  setStatus("failed");
                }
              } catch (error) {
                console.error("Error completing subscription:", error);
                setStatus("failed");
              }
            } else {
              // Setup intent or payment intent without subscription metadata
              setStatus("succeeded");
              setSubscriptionDetails(intent);
              dispatch(clearCart());
            }
            break;
          case "processing":
            setStatus("processing");
            break;
          case "requires_payment_method":
          case "requires_action":
            setStatus("failed");
            break;
          default:
            setStatus("error");
            break;
        }
      } catch {
        // Error checking subscription status
        setStatus("error");
      }
    };

    checkStatus();
  }, [dispatch]);

  const getContent = () => {
    switch (status) {
      case "processing":
        return (
          <Box textAlign="center" py={8}>
            <CircularProgress size={60} sx={{ mb: 4 }} />
            <Typography variant="h4" gutterBottom>
              Processing Subscription
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we set up your membership...
            </Typography>
          </Box>
        );

      case "succeeded":
        return (
          <Box textAlign="center" py={8}>
            <CheckCircleIcon
              sx={{ fontSize: 80, color: "success.main", mb: 4 }}
            />
            <Typography variant="h4" gutterBottom>
              Welcome to The Turn!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Your membership has been activated. We've sent a confirmation
              email with all the details.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your subscription will auto-renew monthly. You can manage your
              membership in your account settings.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Payment ID: {subscriptionDetails?.id}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/the-turn/reserve")}
              sx={{ mt: 3 }}
            >
              Start Booking
            </Button>
          </Box>
        );

      case "failed":
        return (
          <Box textAlign="center" py={8}>
            <ErrorIcon sx={{ fontSize: 80, color: "error.main", mb: 4 }} />
            <Typography variant="h4" gutterBottom>
              Subscription Failed
            </Typography>
            <Typography variant="body1" paragraph>
              We couldn't process your subscription payment. Please try again.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/the-turn/membership")}
              sx={{ mt: 3 }}
            >
              Try Again
            </Button>
          </Box>
        );

      case "error":
      default:
        return (
          <Box textAlign="center" py={8}>
            <ErrorIcon sx={{ fontSize: 80, color: "error.main", mb: 4 }} />
            <Typography variant="h4" gutterBottom>
              Something Went Wrong
            </Typography>
            <Typography variant="body1" paragraph>
              We encountered an error setting up your subscription.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/the-turn/membership")}
              sx={{ mt: 3 }}
            >
              Return to Memberships
            </Button>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {getContent()}
      </Paper>
    </Container>
  );
}

SubscriptionConfirmation.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
