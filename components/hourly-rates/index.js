import React from "react";
import { Card, CardContent, Stack } from "@mui/material";
import styles from "@/styles/Home.module.scss";

const cardStyles = {
    backgroundColor: "rgb(211, 211, 211);",
    padding: "10px",
    "&:hover": {
      transform: "scale(1.05)", // Scales the card when hovered
      boxShadow: 3, // Adds a shadow effect on hover
      transition: "transform 0.2s ease-in-out", // Smoothens the scaling effect
    },
    width: "300px"
  };
  

export default function HourlyRates() {
  return (
    <>
      <h1>Hourly Rates</h1>
      <div className={styles.hourly_rates}>
        <Card align="center" sx={cardStyles}>
          <CardContent orientation="horizontal">
            <Stack spacing={1} padding={2}>
              <h3>Early Bird</h3>
              <h5>Monday - Thursday</h5>
              <h5>10am - 2pm</h5>
              <p>
                <strong>$40</strong>/hr
              </p>
            </Stack>
          </CardContent>
        </Card>
        <Card align="center" sx={cardStyles}>
          <CardContent orientation="horizontal">
            <Stack spacing={1} padding={2}>
              <h3>Mid-week</h3>
              <h5>Monday - Thursday</h5>
              <h5>3pm - 9pm</h5>
              <p>
                <strong>$50</strong>/hr
              </p>
            </Stack>
          </CardContent>
        </Card>
        <Card align="center" sx={cardStyles}>
          <CardContent orientation="horizontal">
            <Stack spacing={1} padding={2}>
              <h3>Weekend</h3>
              <h5>Friday - Sunday</h5>
              <h5>10am - 9pm</h5>
              <p>
                <strong>$50</strong>/hr
              </p>
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
