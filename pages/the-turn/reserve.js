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
import { useDispatch } from "react-redux";
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
  const { data: reservations } = useGetReservationsQuery();
  const dispatch = useDispatch();

  const handleTimeSlotClick = (bay, time, price) => {
    setSelected({ bay, time, price });
  };

  const handleReserveClick = () => {
    if (!selected) return;
    setPendingSelection(selected);
    setSelectedDuration(1);
    setNote("");
    setOccasion("");
    setShowDurationDialog(true);
  };

  const handleConfirmReservation = () => {
    if (pendingSelection) {
      const finalReservation = {
        date: day.toISOString(),
        time: pendingSelection.time,
        service_time: selectedDuration,
        bay: pendingSelection.bay,
        note: note.trim() || null,
        occasion: occasion.trim() || null
      };

      dispatch(
        addToCart({
          item: "reservation",
          price: pendingSelection.price,
          details: finalReservation
        })
      );

      Router.push("/the-turn/checkout");
    }
    setShowDurationDialog(false);
    setPendingSelection(null);
    setSelected(null);
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
                const disabled = dayjs().hour() >= timeInMilitary;

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
        onClose={() => setShowDurationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Complete Your Reservation for Bay {pendingSelection?.bay} at{" "}
          {pendingSelection?.time}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
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
                <Button
                  variant={selectedDuration === 2 ? "contained" : "outlined"}
                  onClick={() => setSelectedDuration(2)}
                  sx={{ minWidth: "80px" }}
                >
                  2 Hours
                </Button>
                <Button
                  variant={selectedDuration === 3 ? "contained" : "outlined"}
                  onClick={() => setSelectedDuration(3)}
                  sx={{ minWidth: "80px" }}
                >
                  3 Hours
                </Button>
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
          <Button onClick={() => setShowDurationDialog(false)}>Cancel</Button>
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
