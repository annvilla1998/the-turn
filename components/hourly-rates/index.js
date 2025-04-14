import React from "react";
import { Card, CardContent, Stack, Typography, Grid } from "@mui/material";

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
  return (
    <>
      <Typography mb={5} variant="h4" align="center" gutterBottom>
        Hourly Rates
      </Typography>
      <Grid
        container
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="center"
      >
        {rates.map((rate, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} width="400px">
            <Card
              sx={{
                backgroundColor: "#d3d3d3",
                p: 2,
                width: "100%",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6
                },
                textAlign: "center",
                borderRadius: 2
              }}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography color="text.primary" variant="h5">
                    {rate.title}
                  </Typography>
                  <Typography color="text.primary" variant="subtitle2">
                    {rate.days}
                  </Typography>
                  <Typography color="text.primary" variant="subtitle2">
                    {rate.time}
                  </Typography>
                  <Typography color="text.primary" variant="h6" mt={2}>
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
