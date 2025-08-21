import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Box,
  Divider,
  Chip,
  Alert,
  CircularProgress,
  Grid
} from "@mui/material";
import {
  AccountCircle,
  CreditCard,
  Receipt,
  Settings
} from "@mui/icons-material";

export default function Dashboard() {
  const { user } = useSelector((state) => state);
  const [customerData, setCustomerData] = useState(null);
  const [stripeCustomerId, setStripeCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get or create Stripe customer
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
            const data = await response.json();
            setStripeCustomerId(data.customerId);
          }
        } catch {
          // Failed to get Stripe customer - not critical, user can still browse
        }
      } else {
        // No user logged in, stop loading
        setLoading(false);
      }
    };

    getStripeCustomer();
  }, [user?.currentUser]);

  // Get customer subscription data
  useEffect(() => {
    const getCustomerData = async () => {
      if (stripeCustomerId) {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/stripe/customer-data?customerId=${stripeCustomerId}`
          );

          if (response.ok) {
            const data = await response.json();
            setCustomerData(data);
          } else {
            // Only show error for actual server errors, not when user has no subscriptions
            const errorData = await response.json().catch(() => ({}));
            if (
              response.status !== 404 &&
              !errorData.message?.includes("No subscriptions found")
            ) {
              setError("No active subscriptions found");
            } else {
              // User simply has no subscriptions, set empty data
              setCustomerData({ subscriptions: [] });
            }
          }
        } catch {
          // Network or other errors - only show if it's a real error
          setError(
            "Unable to connect to payment services. Please try again later."
          );
        } finally {
          setLoading(false);
        }
      } else {
        // No Stripe customer ID means user definitely has no subscriptions
        setLoading(false);
        setCustomerData({ subscriptions: [] });
      }
    };

    getCustomerData();
  }, [stripeCustomerId]);

  const handleManageSubscriptions = async () => {
    if (!stripeCustomerId) return;

    try {
      const response = await fetch("/api/stripe/customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: stripeCustomerId,
          returnUrl: window.location.href
        })
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      } else {
        setError("Unable to access subscription management. Please try again.");
      }
    } catch {
      setError("Unable to access subscription management. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "canceled":
        return "error";
      case "past_due":
        return "warning";
      case "incomplete":
        return "warning";
      default:
        return "default";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getUserName = () => {
    return (
      user?.currentUser?.name ||
      `${user?.currentUser?.first_name || ""} ${
        user?.currentUser?.last_name || ""
      }`.trim()
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Show message if no user is logged in
  if (!user?.currentUser) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Account Dashboard
        </Typography>
        <Box textAlign="center" py={8}>
          <Typography variant="h6" gutterBottom>
            Please sign in to view your dashboard
          </Typography>
          <Button variant="contained" href="/the-turn/sign-in" sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Account Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Account Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountCircle sx={{ mr: 1 }} />
                <Typography variant="h6">Account Info</Typography>
              </Box>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Name:</strong> {getUserName()}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {user?.currentUser?.email}
                </Typography>
                {customerData?.customer && (
                  <Typography variant="body2">
                    <strong>Customer Since:</strong>{" "}
                    {formatDate(customerData.customer.created)}
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Settings sx={{ mr: 1 }} />
                <Typography variant="h6">Quick Actions</Typography>
              </Box>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<CreditCard />}
                  onClick={handleManageSubscriptions}
                  disabled={!stripeCustomerId}
                  size="large"
                >
                  Manage Membership
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Receipt />}
                  onClick={handleManageSubscriptions}
                  disabled={!stripeCustomerId}
                >
                  View Billing History
                </Button>
                <Button variant="outlined" href="/the-turn/memberships">
                  Browse Plans
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Subscriptions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Memberships
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {customerData?.subscriptions?.length > 0 ? (
                <Stack spacing={2}>
                  {customerData.subscriptions.map((subscription) => (
                    <Card key={subscription.id} variant="outlined">
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-start"
                        >
                          <Box>
                            {subscription.items.map((item) => (
                              <Box key={item.id} mb={1}>
                                <Typography variant="h6">
                                  {item.product.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  ${item.price.amount / 100}/
                                  {item.price.interval}
                                </Typography>
                              </Box>
                            ))}
                            <Typography variant="body2" color="text.secondary">
                              <strong>Current Period:</strong>{" "}
                              {formatDate(subscription.current_period_start)} -{" "}
                              {formatDate(subscription.current_period_end)}
                            </Typography>
                            {subscription.cancel_at_period_end && (
                              <Typography variant="body2" color="warning.main">
                                Cancels at end of period
                              </Typography>
                            )}
                          </Box>
                          <Chip
                            label={subscription.status}
                            color={getStatusColor(subscription.status)}
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Box textAlign="center" py={4}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No active memberships
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Subscribe to a membership plan to start booking sessions and
                    accessing member benefits.
                  </Typography>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      href="/the-turn/memberships"
                      size="large"
                    >
                      Subscribe to Membership
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleManageSubscriptions}
                      disabled={!stripeCustomerId}
                    >
                      Manage Billing
                    </Button>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
