import React from "react";
import MainHeader from "@/components/layouts/MainHeader";
import { ImageCarousel } from "@/components/image-carousel";
import HourlyRates from "@/components/hourly-rates";
import { Box, Container, Typography, Grid, useTheme } from "@mui/material";

function Home() {
  const theme = useTheme();
  return (
    <Box
      sx={{ pt: 20 }}
      style={{
        color: theme.palette.common.white,
        backgroundColor: theme.palette.background.black
      }}
    >
      {/* Intro Section */}
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              textAlign={{ xs: "center", md: "left" }}
            >
              Welcome to The Turn!
            </Typography>
            <Typography
              variant="body1"
              lineHeight={1.8}
              textAlign={{ xs: "center", md: "left" }}
            >
              <strong>
                The ultimate indoor golf simulator lounge where technology meets
                recreation.
              </strong>
              <br />
              <br />
              We offer an immersive golfing experience using state-of-the-art
              ball tracking and club data analytics, designed to cater to golf
              enthusiasts of all skill levels. Our advanced simulators provide
              highly accurate, real-time data on ball speed, spin, launch angle,
              and more, giving you the insights you need to refine your game or
              simply enjoy a fun, stress-free round.
              <br />
              <br />
              Whether you&apos;re looking to work on your swing, compete with
              friends, or unwind with a casual round in a comfortable and
              stylish environment, The Turn offers the perfect space. Featuring
              a variety of virtual courses from around the world, our simulators
              create an authentic golfing experience, all while you relax with
              food, drinks, and entertainment. Our lounge is ideal for corporate
              events, casual hangouts, or golf lessons with expert instructors
              (coming soon).
              <br />
              <br />
              Experience the future of golf in a relaxed, social
              atmosphere—whether you&apos;re an avid golfer or a newcomer, we’ve
              got something for everyone.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/gameplay.jpg"
              alt="Gameplay"
              width="100%"
              borderRadius={2}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Hourly Rates Section */}
      <Box mt={10}>
        <Container maxWidth="md">
          <HourlyRates />
        </Container>
      </Box>

      {/* Carousel Section */}
      <Box mt={10}>
        <ImageCarousel />
      </Box>

      {/* Google Maps Section */}
      <Box mt={10}>
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13157.314576223032!2d-117.36524167366714!3d34.46918626984016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c366223d5c6baf%3A0x8bd8fae0adc9699c!2s12044%20Dunia%20Rd%20F%2C%20Victorville%2C%20CA%2092392!5e0!3m2!1sen!2sus!4v1741927695856!5m2!1sen!2sus"
          width="100%"
          height="400px"
          allowFullScreen
          loading="lazy"
        />
      </Box>
    </Box>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};

export default Home;
