import React, { useState } from "react";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import "react-calendar/dist/Calendar.css";
import ProtectedRoute from "@/components/protected-route";
import {
  Grid,
  Paper,
  Button,
  Stack,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useGetReservationsQuery } from "../../store/apis/reservation";
import { addToCart } from "@/store/cart";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

const weekdays = ["Mon", "Tues", "Wed", "Thurs"];

const getTimes = (dayOfWeek) => {
  const times = [];

  for (let i = 10; i <= 19; i++) {
    let currPrice;
    let currTime = i > 12 ? i - 12 : i;
    if (i <= 14 && weekdays.includes(dayOfWeek)) {
      currPrice = 40;
    } else {
      currPrice = 50;
    }
    times.push({
      time: `${currTime}:00 ${i > 11 ? "PM" : "AM"}`,
      price: currPrice
    });
  }

  return times;
};

const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
export default function Reserve() {
  const minDay = dayjs().hour() <= 19 ? dayjs() : dayjs().add(1, "day");
  const [day, setDay] = useState(minDay);
  const nextWeek = dayjs().add(2, "week");

  return (
    <ProtectedRoute>
      <Stack spacing={3}>
        <Typography align="center" variant="h4">
          Reserve a Bay
        </Typography>
        <DatePicker
          minDate={minDay}
          maxDate={nextWeek}
          disablePast
          label="Choose a day"
          value={day}
          onChange={(newValue) => setDay(newValue)}
        />
        <Bays dayOfWeek={days[day.day()]} day={day} />
      </Stack>
    </ProtectedRoute>
  );
}

function Bays({ dayOfWeek, day }) {
  const theme = useTheme();
  // { bay: 1, time: "10:00", price: "50", service_time: 1 }
  const [selected, setSelected] = useState(null);
  const [showDurationDialog, setShowDurationDialog] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [note, setNote] = useState("");
  const [occasion, setOccasion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: reservations } = useGetReservationsQuery();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Helper function to check if a reservation time overlaps with cart items
  const checkForOverlappingReservations = (newReservation) => {
    // Safety checks
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return false; // No items in cart, no overlap possible
    }

    // Get only reservation items with valid details
    const reservationsInCart = cartItems.filter(
      (item) =>
        item.item === "reservation" &&
        item.details &&
        item.details.date &&
        item.details.bay &&
        item.details.time
    );
    if (reservationsInCart.length === 0) {
      return false; // No reservations in cart, no overlap possible
    }

    try {
      // Format the new reservation date for comparison
      const newDate = dayjs(newReservation.date).format("YYYY-MM-DD");

      // Ensure bay is a number
      const newBay =
        typeof newReservation.bay === "string"
          ? parseInt(newReservation.bay, 10)
          : newReservation.bay;

      // Ensure duration is a number
      const newDuration =
        typeof newReservation.service_time === "string"
          ? parseInt(newReservation.service_time, 10)
          : newReservation.service_time || 1;

      // Helper function to convert time string to decimal hours (e.g., "6:30 PM" -> 18.5)
      const parseTimeToDecimal = (timeStr) => {
        if (!timeStr || typeof timeStr !== "string") return 0;

        const [timePart, period] = timeStr.split(" ");
        if (!timePart || !period) return 0;

        const [hoursStr, minutesStr] = timePart.split(":");
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr || "0", 10) / 60; // Convert minutes to decimal

        // Convert to 24-hour format
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        return hours + minutes;
      };

      // Calculate start and end times for new reservation
      const newStartTime = parseTimeToDecimal(newReservation.time);
      const newEndTime = newStartTime + newDuration;

      // Check each reservation in cart for overlap
      for (const cartItem of reservationsInCart) {
        const cartReservation = cartItem.details;

        try {
          // Format cart reservation date for comparison
          const cartDate = dayjs(cartReservation.date).format("YYYY-MM-DD");

          // Ensure cart bay is a number
          const cartBay =
            typeof cartReservation.bay === "string"
              ? parseInt(cartReservation.bay, 10)
              : cartReservation.bay;

          // Only check for overlap if same date and bay
          if (cartDate === newDate && cartBay === newBay) {
            // Ensure cart duration is a number
            const cartDuration =
              typeof cartReservation.service_time === "string"
                ? parseInt(cartReservation.service_time, 10)
                : cartReservation.service_time || 1;

            const cartStartTime = parseTimeToDecimal(cartReservation.time);
            const cartEndTime = cartStartTime + cartDuration;

            // Check for overlap - if one reservation starts before the other ends
            if (newStartTime < cartEndTime && cartStartTime < newEndTime) {
              // For debugging - without console.log to avoid linting errors
              if (typeof window !== "undefined") {
                window._debug = {
                  overlap: true,
                  new: {
                    date: newDate,
                    bay: newBay,
                    start: newStartTime,
                    end: newEndTime
                  },
                  cart: {
                    date: cartDate,
                    bay: cartBay,
                    start: cartStartTime,
                    end: cartEndTime
                  }
                };
              }

              return true; // Overlap detected
            }
          }
        } catch {
          // Continue to next reservation if there's an error with this one
          continue;
        }
      }

      return false; // No overlap found
    } catch {
      // If any error occurs during the check, be conservative and say there's no overlap
      return false;
    }
  }; // Helper function to determine the maximum allowed duration for a time slot

  const getMaxAllowedDuration = (timeSlot) => {
    if (!timeSlot) return 3; // Default max duration

    if (timeSlot.includes("8:00 PM")) return 1; // At 8 PM, only 1 hour is allowed
    if (timeSlot.includes("7:00 PM")) return 2; // At 7 PM, max 2 hours
    if (timeSlot.includes("6:00 PM")) return 2; // At 6 PM, max 2 hours

    return 3; // For all other times, 3 hours max
  };

  const handleTimeSlotClick = (bay, time, price) => {
    setSelected({ bay, time, price });
  };

  const handleReserveClick = () => {
    if (!selected) return;
    setPendingSelection(selected);

    // Get the maximum allowed duration for this time slot
    const maxDuration = getMaxAllowedDuration(selected.time);

    // If current selection exceeds the maximum allowed, reset to 1 hour
    let adjustedDuration = selectedDuration || 1;
    if (adjustedDuration > maxDuration) {
      adjustedDuration = 1;
    }

    setSelectedDuration(adjustedDuration);
    setNote("");
    setOccasion("");
    setShowDurationDialog(true);
  };

  const handleConfirmReservation = () => {
    if (pendingSelection) {
      const finalReservation = {
        date: day.toISOString(),
        basePrice: pendingSelection.price,
        time: pendingSelection.time,
        service_time: selectedDuration,
        bay: pendingSelection.bay,
        note: note.trim() || null,
        occasion: occasion.trim() || null
      };

      try {
        // Check if this reservation overlaps with existing cart items
        const hasOverlap = checkForOverlappingReservations(finalReservation);

        if (hasOverlap) {
          // Show error message if there's an overlap
          setErrorMessage(
            "You already have a reservation for this bay during this time in your cart."
          );
          return;
        }

        // Clear any previous error
        setErrorMessage("");

        // Add to cart if no overlap
        dispatch(
          addToCart({
            item: "reservation",
            price: pendingSelection.price * selectedDuration,
            details: finalReservation
          })
        );

        // Navigate to checkout
        Router.push("/the-turn/checkout");
        setShowDurationDialog(false);
        setPendingSelection(null);
        setSelected(null);
      } catch {
        // Show error if something fails in the overlap check
        setErrorMessage(
          "An error occurred while checking for overlapping reservations. Please try again."
        );
      }
    }
  };
  return (
    <Grid container spacing={1}>
      {["Bay 1", "Bay 2", "Bay 3", "Bay 4"].map((suite, i) => {
        const times = getTimes(dayOfWeek);
        const currBay = suite.split(" ")[1];

        return (
          <Grid
            size="grow"
            key={i}
            sx={{
              mb: "60px"
            }}
          >
            <Stack spacing={2}>
              <Paper
                elevation={4}
                sx={{
                  height: "100px",
                  alignContent: "center",
                  textAlign: "center"
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: "20px" }}>
                  {suite}
                </Typography>
              </Paper>
              {times.map(({ price, time }, i) => {
                const available = !reservations?.some(
                  ({ date, time: reservedTime, bay, service_time }) => {
                    // Skip if different bay
                    if (bay && bay !== parseInt(currBay)) {
                      return false;
                    }

                    // Skip if different date
                    if (
                      dayjs(date).get("year") !== day.get("year") ||
                      dayjs(date).get("month") !== day.get("month") ||
                      dayjs(date).get("date") !== day.get("date")
                    ) {
                      return false;
                    }

                    // Convert current time to 24-hour format
                    const currentTimeHour = parseInt(time.split(":")[0]);
                    const currentTimeIn24 =
                      time.includes("PM") && currentTimeHour !== 12
                        ? currentTimeHour + 12
                        : time.includes("AM") && currentTimeHour === 12
                          ? 0
                          : currentTimeHour;

                    // Convert reserved time to 24-hour format
                    const reservedTimeHour = parseInt(
                      reservedTime.split(":")[0]
                    );
                    const reservedTimeIn24 =
                      reservedTime.includes("PM") && reservedTimeHour !== 12
                        ? reservedTimeHour + 12
                        : reservedTime.includes("AM") && reservedTimeHour === 12
                          ? 0
                          : reservedTimeHour;

                    // Check if current time falls within the reserved time range
                    const reservationEndTime =
                      reservedTimeIn24 + (service_time || 1);
                    return (
                      currentTimeIn24 >= reservedTimeIn24 &&
                      currentTimeIn24 < reservationEndTime
                    );
                  }
                );

                const parsedTime = Number(time.split(":")[0]);
                const timeInMilitary =
                  parsedTime < 10 ? parsedTime + 12 : parsedTime;

                const currToken = available
                  ? theme.palette.info.main
                  : theme.palette.warning.light;

                // Only disable past hours for the current day
                const isToday = day.isSame(dayjs(), "day");
                const disabled = isToday && dayjs().hour() >= timeInMilitary;

                return (
                  <Paper
                    key={i}
                    sx={{
                      cursor: disabled || !available ? "" : "pointer",
                      padding: "15px",
                      textAlign: "center",
                      border: `1px solid ${disabled ? theme.palette.action.disabled : currToken}`,
                      color: disabled
                        ? theme.palette.action.disabled
                        : currToken,
                      backgroundColor:
                        selected &&
                        selected.bay === parseInt(currBay) &&
                        selected.time === time
                          ? "rgba(0, 0, 0, 0.1)"
                          : "",
                      "&:hover": {
                        backgroundColor:
                          !disabled && available
                            ? theme.palette.action.hover
                            : ""
                      }
                    }}
                    variant="outlined"
                    onClick={() => {
                      if (!disabled && available) {
                        handleTimeSlotClick(parseInt(currBay), time, price);
                      }
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography
                        sx={{
                          fontWeight: 500
                        }}
                      >
                        {time}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 500
                        }}
                      >
                        {available ? "Available" : "Reserved"}
                      </Typography>
                      <Typography>${price}.00</Typography>
                    </Stack>
                  </Paper>
                );
              })}
            </Stack>
          </Grid>
        );
      })}

      <Dialog
        open={showDurationDialog}
        onClose={() => {
          setShowDurationDialog(false);
          setErrorMessage("");
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Complete Your Reservation for Bay {pendingSelection?.bay} at{" "}
          {pendingSelection?.time}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {errorMessage && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errorMessage}
              </Typography>
            )}
            <div>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                How long would you like to golf?
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant={selectedDuration === 1 ? "contained" : "outlined"}
                  onClick={() => setSelectedDuration(1)}
                  sx={{ minWidth: "80px" }}
                >
                  1 Hour
                </Button>
                {/* 2-hour option, conditionally disabled based on time */}
                {getMaxAllowedDuration(pendingSelection?.time) >= 2 ? (
                  <Button
                    variant={selectedDuration === 2 ? "contained" : "outlined"}
                    onClick={() => setSelectedDuration(2)}
                    sx={{ minWidth: "80px" }}
                  >
                    2 Hours
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="outlined"
                    sx={{
                      minWidth: "80px",
                      opacity: 0.5,
                      "&:hover": {
                        cursor: "not-allowed"
                      }
                    }}
                    title="Not available due to business hours (closing at 9:00 PM)"
                  >
                    2 Hours
                  </Button>
                )}

                {/* 3-hour option, conditionally disabled based on time */}
                {getMaxAllowedDuration(pendingSelection?.time) >= 3 ? (
                  <Button
                    variant={selectedDuration === 3 ? "contained" : "outlined"}
                    onClick={() => setSelectedDuration(3)}
                    sx={{ minWidth: "80px" }}
                  >
                    3 Hours
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="outlined"
                    sx={{
                      minWidth: "80px",
                      opacity: 0.5,
                      "&:hover": {
                        cursor: "not-allowed"
                      }
                    }}
                    title="Not available due to business hours (closing at 9:00 PM)"
                  >
                    3 Hours
                  </Button>
                )}
              </Stack>
            </div>

            <TextField
              label="Occasion (Optional)"
              placeholder="Birthday, Anniversary, Corporate Event, etc."
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              fullWidth
            />

            <TextField
              label="Additional Notes (Optional)"
              placeholder="Any special requests or information..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowDurationDialog(false);
              setErrorMessage("");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmReservation}
            color="primary"
          >
            Confirm Reservation
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        color="primary"
        variant="contained"
        size="large"
        disabled={!selected}
        sx={{
          position: "fixed",
          bottom: 20,
          left: "30%",
          width: "500px",
          "@media (max-width: 600px)": {
            width: "100%",
            left: 0
          }
        }}
        onClick={handleReserveClick}
      >
        Reserve
      </Button>
    </Grid>
  );
}

Reserve.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
