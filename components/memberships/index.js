import React from "react";
import { Card, CardContent, Stack, Typography, Grid } from "@mui/material";
import Router from "next/router";

const rates = [
  {
    title: "Starter Membership",
    price: "$49.00 per month",
    link: "https://theturnvv.golfoclock.com/purchase/mem-a11b46ae-ea67-4190-96cd-80d7b9ac5687"
  },
  {
    title: "Player Membership",
    price: "$99.00 per month",
    link: "https://theturnvv.golfoclock.com/purchase/mem-f0480b87-4528-46c8-a0ef-7e41be611f00"
  },
  {
    title: "Plus Membership",
    price: "$150.00 per month",
    link: "https://theturnvv.golfoclock.com/purchase/mem-cd5e6dd1-2d0d-4147-9e78-7f62b0e8925d"
  },
  {
    title: "Elite Membership",
    price: "$299.00 per month",
    link: "https://theturnvv.golfoclock.com/purchase/mem-50fa5d83-c9a0-4578-a517-9edc1f51f5b7"
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
