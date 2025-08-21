import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements
} from "@stripe/react-stripe-js";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import stripePromise from "@/lib/stripe";

// Payment Form that uses Stripe Elements
function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    // Confirm payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/the-turn/payment-confirmation`
      }
    });

    if (error) {
      setErrorMessage(
        error.message || "Something went wrong with your payment"
      );
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={!stripe || isLoading}
        sx={{ mt: 3 }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          `Pay $${amount}.00`
        )}
      </Button>
    </form>
  );
}

// Stripe wrapper component
export default function StripeCheckout({ amount, metadata }) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Create payment intent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);

        if (!amount || amount <= 0) {
          throw new Error("Invalid payment amount");
        }
        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            metadata
          })
        });

        // Parse the JSON response even if it's an error
        const data = await response.json();

        if (!response.ok) {
          // Use the error message from the API if available
          throw new Error(data.error || "Payment setup failed");
        }

        if (!data.clientSecret) {
          throw new Error("Invalid response from payment service");
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        const errorMessage =
          error.message ||
          "Failed to load payment system. Please try again later.";
        setError(errorMessage);
        console.error("Payment Intent Error:", errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    createPaymentIntent();
  }, [amount, metadata]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#3f51b5"
    }
  };

  const options = {
    clientSecret,
    appearance
  };

  return (
    <Box sx={{ mt: 3 }}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm amount={amount} />
          </Elements>
        )
      )}
    </Box>
  );
}
