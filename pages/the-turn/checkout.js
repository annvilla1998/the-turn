import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import { removeFromCart, clearCart } from "@/store/cart";
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
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import dayjs from "dayjs";

export default function Checkout() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  const handleRemoveItem = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMM DD, YYYY");
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
      <Stack spacing={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
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

        <Grid container spacing={4}>
          <Grid item xs={12} md={8} flex={1} minWidth={250}>
            <Stack spacing={2}>
              {cart?.items.map((item, index) => (
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
                            <strong>Date:</strong>{" "}
                            {formatDate(item.details.date)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Time:</strong> {item.details.time}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Duration:</strong>{" "}
                            {item.details.service_time} hour
                            {item.details.service_time > 1 ? "s" : ""}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Base Price:</strong> $
                            {item.details.basePrice} / hour
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
                        <Stack
                          direction="row"
                          width="100%"
                          justifyContent="flex-end"
                        >
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
              ))}
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
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body1">
                      Items ({cart?.items.length})
                    </Typography>
                    <Typography variant="body1">${cart?.total}.00</Typography>
                  </Box>

                  <Divider />

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6" color="primary">
                      ${cart?.total}.00
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Proceed to Payment
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

Checkout.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
