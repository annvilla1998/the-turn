import React from "react";
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Grid,
  useTheme
} from "@mui/material";

const rates = [
  {
    title: "Early Bird",
    days: "Monday - Thursday",
    time: "10am - 2pm",
    price: "$40/hr"
  },
  {
    title: "Mid-week",
    days: "Monday - Thursday",
    time: "3pm - 9pm",
    price: "$50/hr"
  },
  {
    title: "Weekend",
    days: "Friday - Sunday",
    time: "10am - 9pm",
    price: "$50/hr"
  }
];

export default function HourlyRates() {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.common.white,
          fontWeight: "bold",
          background: `linear-gradient(45deg, ${theme.palette.common.white}, ${theme.palette.custom.logoLightGreen})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
          mb: 4
        }}
      >
        Hourly Rates
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        {rates.map((rate, index) => (
          <Grid
            item
            xs={12}
            sm={4}
            md={3.5}
            key={index}
            sx={{ display: "flex", flexGrow: 1 }}
          >
            <Card
              sx={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)`,
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.custom.logoLightGreen}30`,
                borderRadius: 3,
                p: 3,
                width: "100%",
                transition: "all 0.3s ease-in-out",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.03)",
                  boxShadow: `0 20px 40px rgba(0,0,0,0.4)`,
                  border: `1px solid ${theme.palette.custom.logoLightGreen}60`
                },
                textAlign: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  background: `linear-gradient(90deg, ${theme.palette.custom.logoLightGreen}, ${theme.palette.custom.logoDarkGreen})`
                }
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Stack spacing={2}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.custom.logoLightGreen,
                      fontWeight: "bold"
                    }}
                  >
                    {rate.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme.palette.common.white,
                      opacity: 0.9
                    }}
                  >
                    {rate.days}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme.palette.common.white,
                      opacity: 0.9
                    }}
                  >
                    {rate.time}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: "bold",
                      mt: 2,
                      background: `linear-gradient(45deg, ${theme.palette.common.white}, ${theme.palette.custom.logoLightGreen})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    {rate.price}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
