import React from "react";
import { Container, Typography, Grid, Paper, useTheme } from "@mui/material";

export default function AboutSection() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, mb: 8 }}>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} md={10}>
          <Paper
            sx={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              border: `1px solid rgba(196, 253, 60, 0.2)`,
              p: 4,
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
            }}
          >
            <Typography
              variant="body1"
              lineHeight={1.8}
              textAlign="center"
              sx={{
                color: theme.palette.common.white,
                fontSize: "1.1rem",
                opacity: 0.95
              }}
            >
              We offer an immersive golfing experience using state-of-the-art
              ball tracking and club data analytics, designed to cater to golf
              enthusiasts of all skill levels. Our advanced simulators provide
              highly accurate, real-time data on ball speed, spin, launch angle,
              and more, giving you the insights you need to refine your game or
              simply enjoy a fun, stress-free round.
              <br />
              <br />
              Whether you're looking to work on your swing, compete with
              friends, or unwind with a casual round in a comfortable and
              stylish environment, The Turn offers the perfect space. Featuring
              a variety of virtual courses from around the world, our simulators
              create an authentic golfing experience, all while you relax with
              food, drinks, and entertainment. Our lounge is ideal for corporate
              events, casual hangouts, or golf lessons with expert instructors
              (coming soon).
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
