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

export default function PaymentConfirmation() {
  const router = useRouter();
  const [status, setStatus] = useState("processing");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkStatus = async () => {
      // Initialize Stripe
      const stripe = await stripePromise;

      if (!stripe) {
        setStatus("error");
        return;
      }

      // Retrieve the client secret from URL
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        setStatus("error");
        return;
      }

      try {
        // Retrieve the PaymentIntent
        const { paymentIntent } =
          await stripe.retrievePaymentIntent(clientSecret);

        if (!paymentIntent) {
          setStatus("error");
          return;
        }

        switch (paymentIntent.status) {
          case "succeeded":
            setStatus("succeeded");
            setPaymentDetails(paymentIntent);
            // Clear the cart after successful payment
            dispatch(clearCart());
            break;
          case "processing":
            setStatus("processing");
            break;
          case "requires_payment_method":
            setStatus("failed");
            break;
          default:
            setStatus("error");
            break;
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
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
              Processing Payment
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please wait while we confirm your payment...
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
              Payment Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thank you for your reservation. We've sent a confirmation email
              with all the details.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Payment ID: {paymentDetails?.id}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/the-turn/reserve")}
              sx={{ mt: 3 }}
            >
              Make Another Reservation
            </Button>
          </Box>
        );

      case "failed":
        return (
          <Box textAlign="center" py={8}>
            <ErrorIcon sx={{ fontSize: 80, color: "error.main", mb: 4 }} />
            <Typography variant="h4" gutterBottom>
              Payment Failed
            </Typography>
            <Typography variant="body1" paragraph>
              We couldn't process your payment. Please try again.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/the-turn/checkout")}
              sx={{ mt: 3 }}
            >
              Return to Checkout
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
              We encountered an error processing your payment.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push("/the-turn/checkout")}
              sx={{ mt: 3 }}
            >
              Return to Checkout
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

PaymentConfirmation.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
