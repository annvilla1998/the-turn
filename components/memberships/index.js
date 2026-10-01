import React from "react";
import { Card, CardContent, Stack, Typography, Grid } from "@mui/material";
import Router from "next/router";

const rates = [
  {
    title: "Starter Membership",
    price: "$49.00 per month",
    link: "https://app.birdiegrow.com/join/the-turn"
  },
  {
    title: "Player Membership",
    price: "$99.00 per month",
    link: "https://app.birdiegrow.com/join/the-turn"
  },
  {
    title: "Plus Membership",
    price: "$150.00 per month",
    link: "https://app.birdiegrow.com/join/the-turn"
  },
  {
    title: "Elite Membership",
    price: "$299.00 per month",
    link: "https://app.birdiegrow.com/join/the-turn"
  }
];

export default function Memberships() {
  return (
    <>
      <Typography color="white" mb={5} variant="h4" align="center" gutterBottom>
        Memberships
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
                borderRadius: 2,
                cursor: "pointer"
              }}
              onClick={() => Router.push(rate.link)}
            >
              <CardContent>
                <Stack spacing={1}>
                  <Typography color="text.primary" variant="h5">
                    {rate.title}
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
