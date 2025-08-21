import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import { removeFromCart, clearCart } from "@/store/cart";
import StripeCheckout from "@/components/checkout/StripeCheckout";
import { checkActiveSubscriptions } from "@/utils/subscriptionUtils";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Box,
  Divider,
  IconButton,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import dayjs from "dayjs";

export default function Checkout() {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state);
  const [activeStep, setActiveStep] = useState(0);
  const [stripeCustomerId, setStripeCustomerId] = useState(null);
  const [existingMemberships, setExistingMemberships] = useState([]);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);
  const [membershipCheckComplete, setMembershipCheckComplete] = useState(false);
  const steps = ["Review Cart", "Payment"];

  // Create or retrieve Stripe customer when user is available
  useEffect(() => {
    const createStripeCustomer = async () => {
      if (user?.currentUser?.email && !stripeCustomerId) {
        try {
          const response = await fetch("/api/stripe/create-customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.currentUser.email,
              name:
                user.currentUser.name ||
                user.currentUser.first_name + " " + user.currentUser.last_name,
              userId: user.currentUser.id
            })
          });

          if (response.ok) {
            const data = await response.json();
            setStripeCustomerId(data.customerId);
          }
        } catch {
          // Failed to create Stripe customer
        }
      }
    };

    createStripeCustomer();
  }, [user?.currentUser, stripeCustomerId]);

  // Separate cart items by type (must be defined before useEffect)
  const membershipItems =
    cart?.items.filter((item) => item.item === "membership") || [];
  const oneTimeItems =
    cart?.items.filter((item) => item.item !== "membership") || [];

  // Check for existing memberships when customer ID and cart has memberships
  useEffect(() => {
    const checkExistingMemberships = async () => {
      if (
        stripeCustomerId &&
        membershipItems.length > 0 &&
        !membershipCheckComplete
      ) {
        const result = await checkActiveSubscriptions(stripeCustomerId);

        if (result.hasActive) {
          setExistingMemberships(result.subscriptions);
          setShowMembershipDialog(true);
        }
        setMembershipCheckComplete(true);
      }
    };

    checkExistingMemberships();
  }, [stripeCustomerId, membershipItems.length, membershipCheckComplete]);

  const handleRemoveItem = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCloseMembershipDialog = () => {
    setShowMembershipDialog(false);
    // Remove membership items from cart
    const membershipIndices = cart.items
      .map((item, index) => (item.item === "membership" ? index : -1))
      .filter((index) => index !== -1)
      .reverse(); // Remove from end to maintain indices

    membershipIndices.forEach((index) => {
      dispatch(removeFromCart(index));
    });
  };

  const handleManageExistingMembership = () => {
    setShowMembershipDialog(false);
    // Redirect to dashboard to manage existing membership
    window.location.href = "/the-turn/dashboard";
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  // Calculate totals
  const membershipTotal = membershipItems.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const oneTimeTotal = oneTimeItems.reduce(
    (sum, item) => (item.item === "reservation" ? sum + 10 : sum + item.price),
    0
  );

  const renderCartItem = (item, index) => {
    if (item.item === "membership") {
      return (
        <Card key={index} variant="outlined">
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box flex={1}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography variant="h6">{item.details.name}</Typography>
                </Box>

                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Monthly Hours:</strong> {item.details.hours} hours
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Session Length:</strong> Up to{" "}
                    {item.details.sessionLength} hour
                    {item.details.sessionLength > 1 ? "s" : ""}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Billing:</strong> Recurring monthly
                  </Typography>
                </Stack>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
              >
                <Stack direction="row" width="100%" justifyContent="flex-end">
                  <Typography variant="h6" color="primary">
                    ${item.price}.00/month
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
      );
    }

    // Render reservation items (existing logic)
    return (
      <Card key={index} variant="outlined">
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h6">
                  Bay {item.details.bay} Reservation
                </Typography>
              </Box>

              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Date:</strong> {formatDate(item.details.date)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Time:</strong> {item.details.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Duration:</strong> {item.details.service_time} hour
                  {item.details.service_time > 1 ? "s" : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Base Price:</strong> ${item.details.basePrice} / hour
                </Typography>
                {item.details.occasion && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Occasion:</strong> {item.details.occasion}
                  </Typography>
                )}
                {item.details.note && (
                  <Typography variant="body2" color="text.secondary">
                    <strong>Notes:</strong> {item.details.note}
                  </Typography>
                )}
              </Stack>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="space-between"
              gap={1}
            >
              <Stack direction="row" width="100%" justifyContent="flex-end">
                <Typography variant="h6" color="primary">
                  ${item.price}.00
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveItem(index)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
              {item.item === "reservation" && (
                <Typography variant="body2" color="text.secondary">
                  $10 non-refundable deposit due now.
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  if (cart?.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          textAlign="center"
        >
          <ShoppingCartIcon
            sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Add some reservations to get started!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/the-turn/reserve"
            size="large"
          >
            Reserve a Bay
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Stack spacing={4}>
        {activeStep === 0 ? (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" component="h1">
                Shopping Cart
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearCart}
                startIcon={<DeleteIcon />}
              >
                Clear Cart
              </Button>
            </Box>

            {/* Membership conflict warning */}
            {existingMemberships.length > 0 && membershipItems.length > 0 && (
              <Alert severity="warning">
                <Typography variant="subtitle2" gutterBottom>
                  Multiple Membership Detected
                </Typography>
                <Typography variant="body2">
                  You already have an active membership. Please manage your
                  existing membership before adding a new one.
                </Typography>
              </Alert>
            )}

            <Grid container spacing={4}>
              <Grid item xs={12} md={8} flex={1} minWidth={250}>
                <Stack spacing={2}>
                  {cart?.items.map((item, index) =>
                    renderCartItem(item, index)
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ position: "sticky", top: 20 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Summary
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={2}>
                      {oneTimeItems.length > 0 && (
                        <>
                          <Typography variant="subtitle1" color="primary">
                            One-time Items
                          </Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">
                              {oneTimeItems.length} item
                              {oneTimeItems.length > 1 ? "s" : ""}
                            </Typography>
                            <Typography variant="body2">
                              ${oneTimeTotal}.00
                            </Typography>
                          </Box>
                        </>
                      )}

                      {membershipItems.length > 0 && (
                        <>
                          <Typography variant="subtitle1" color="primary">
                            Memberships
                          </Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">
                              {membershipItems.length} membership
                              {membershipItems.length > 1 ? "s" : ""}
                            </Typography>
                            <Typography variant="body2">
                              ${membershipTotal}.00/month
                            </Typography>
                          </Box>
                        </>
                      )}

                      <Divider />

                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6">Total Due Today</Typography>
                        <Typography variant="h6" color="primary">
                          ${oneTimeTotal + membershipTotal}.00
                        </Typography>
                      </Box>

                      {membershipItems.length > 0 && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                        >
                          Memberships will auto-renew monthly
                        </Typography>
                      )}

                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={handleNextStep}
                        disabled={
                          showMembershipDialog ||
                          (membershipItems.length > 0 &&
                            !membershipCheckComplete)
                        }
                        sx={{ mt: 2 }}
                      >
                        {membershipItems.length > 0 && !membershipCheckComplete
                          ? "Checking Existing Memberships..."
                          : "Proceed to Payment"}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4" component="h1">
                Payment
              </Typography>
              <Button variant="outlined" onClick={handleBackStep}>
                Back to Cart
              </Button>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Payment Details
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    {/* Handle mixed cart with memberships and one-time items */}
                    {membershipItems.length > 0 && oneTimeItems.length > 0 ? (
                      <Alert severity="warning" sx={{ mb: 3 }}>
                        Your cart contains memberships which need to be managed
                        through our billing portal. Memberships have been
                        removed from your cart. Please visit the membership page
                        to subscribe.
                      </Alert>
                    ) : membershipItems.length > 0 ? (
                      // If somehow memberships are in cart, redirect to membership page
                      <Alert severity="info" sx={{ mb: 3 }}>
                        Memberships must be managed through our secure billing
                        portal.
                        <Button
                          variant="contained"
                          sx={{ ml: 2 }}
                          onClick={() => {
                            dispatch(clearCart());
                            window.location.href = "/the-turn/memberships";
                          }}
                        >
                          Go to Memberships
                        </Button>
                      </Alert>
                    ) : (
                      // One-time payment checkout
                      <StripeCheckout
                        amount={oneTimeTotal}
                        metadata={{
                          items: JSON.stringify(
                            oneTimeItems.map((item) => ({
                              id: item.id,
                              type: item.item,
                              price: item.price
                            }))
                          )
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ position: "sticky", top: 20 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Order Summary
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={2}>
                      {oneTimeItems.length > 0 && (
                        <>
                          <Typography variant="subtitle1" color="primary">
                            One-time Items
                          </Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">
                              {oneTimeItems.length} item
                              {oneTimeItems.length > 1 ? "s" : ""}
                            </Typography>
                            <Typography variant="body2">
                              ${oneTimeTotal}.00
                            </Typography>
                          </Box>
                        </>
                      )}

                      {membershipItems.length > 0 && (
                        <>
                          <Typography variant="subtitle1" color="primary">
                            Memberships
                          </Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">
                              {membershipItems.length} membership
                              {membershipItems.length > 1 ? "s" : ""}
                            </Typography>
                            <Typography variant="body2">
                              ${membershipTotal}.00/month
                            </Typography>
                          </Box>
                        </>
                      )}

                      <Divider />

                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6">Total Due Today</Typography>
                        <Typography variant="h6" color="primary">
                          ${oneTimeTotal + membershipTotal}.00
                        </Typography>
                      </Box>

                      {membershipItems.length > 0 && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                        >
                          Memberships will auto-renew monthly
                        </Typography>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Stack>

      {/* Membership Conflict Dialog */}
      <Dialog open={showMembershipDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Existing Membership Found</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            You already have an active membership. You can only have one
            membership at a time.
          </Typography>

          {existingMemberships.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                Your current membership:
              </Typography>
              {existingMemberships.map((subscription) => (
                <Card key={subscription.id} variant="outlined" sx={{ mt: 1 }}>
                  <CardContent sx={{ py: 1 }}>
                    {subscription.items.map((item) => (
                      <Typography key={item.id} variant="body2">
                        <strong>{item.product.name}</strong> - $
                        {item.price.amount / 100}/{item.price.interval}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            To change your membership, please cancel your current membership
            first through your dashboard, then you can purchase a new one.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMembershipDialog} color="primary">
            Remove from Cart
          </Button>
          <Button
            onClick={handleManageExistingMembership}
            variant="contained"
            color="primary"
          >
            Manage Current Membership
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

Checkout.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
