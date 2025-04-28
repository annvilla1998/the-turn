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
  useTheme
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
      price: `${currPrice}`
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
        <Bays dayOfWeek={days[day.day()]} />
      </Stack>
    </ProtectedRoute>
  );
}

function Bays({ dayOfWeek }) {
  const theme = useTheme();
  const [selected, setSelected] = useState(null);

  return (
    <Grid container spacing={4}>
      {["Bay 1", "Bay 2", "Bay 3", "Bay 4"].map((suite, i) => {
        const times = getTimes(dayOfWeek);
        const available = true;
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
                const parsedTime = Number(time.split(":")[0]);
                const timeInMilitary =
                  parsedTime >= 12 ? parsedTime + 12 : parsedTime;
                const currToken = available
                  ? theme.palette.info.main
                  : theme.palette.warning.light;
                const disabled = dayjs().hour() <= timeInMilitary;
                return (
                  <Paper
                    key={i}
                    sx={{
                      cursor: "pointer",
                      padding: "15px",
                      textAlign: "center",
                      border: `1px solid ${disabled ? theme.palette.action.disabled : currToken}`,
                      color: disabled
                        ? theme.palette.action.disabled
                        : currToken,
                      backgroundColor:
                        selected &&
                        selected.bay === currBay &&
                        selected.time === time
                          ? theme.palette.action.selected
                          : "",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                    variant="outlined"
                    onClick={() => {
                      setSelected({ bay: currBay, time });
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
      <Button
        color="primary"
        variant="contained"
        size="large"
        disabled={!selected}
        sx={{
          position: "fixed",
          bottom: 20,
          left: "40%",
          width: "300px"
        }}
      >
        Reserve
      </Button>
    </Grid>
  );
}

Reserve.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
