import React from "react";
import MainHeader from "@/components/layouts/MainHeader";
import ImageCarousel from "@/components/image-carousel";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import VideoSection from "@/components/video-section";
import PricingSection from "@/components/pricing-section";
import { Box, Container, Typography, useTheme, Paper } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

function Home() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        pt: 20,
        background: `linear-gradient(135deg, ${theme.palette.background.black} 0%, ${theme.palette.custom.logoPurple} 40%, ${theme.palette.background.black} 100%)`,
        minHeight: "100vh",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 80%, ${theme.palette.custom.logoLightGreen}15 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${theme.palette.custom.logoDarkGreen}10 0%, transparent 50%)`,
          pointerEvents: "none"
        }
      }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Video Section */}
      <VideoSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Enhanced Carousel Section */}
      <Box
        mt={10}
        sx={{
          position: "relative",
          zIndex: 1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, transparent 0%, rgba(196, 253, 60, 0.05) 50%, transparent 100%)`,
            pointerEvents: "none"
          }
        }}
      >
        <ImageCarousel />
      </Box>

      {/* Modern Google Maps Section */}
      <Box mt={10} sx={{ position: "relative", zIndex: 1 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2
              }}
            >
              <LocationOn
                sx={{
                  color: theme.palette.custom.logoLightGreen,
                  fontSize: "2rem",
                  mr: 1
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: "bold",
                  background: `linear-gradient(45deg, ${theme.palette.common.white}, ${theme.palette.custom.logoLightGreen})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Visit Us Today
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.white, opacity: 0.8 }}
            >
              Located in the heart of Victorville, CA
            </Typography>
          </Box>

          <Paper
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
              border: `2px solid rgba(196, 253, 60, 0.3)`,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: `linear-gradient(45deg, ${theme.palette.custom.logoLightGreen}, ${theme.palette.custom.logoDarkGreen}, ${theme.palette.primary.main})`,
                borderRadius: 4,
                zIndex: -1,
                opacity: 0.3
              }
            }}
          >
            <Box
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13157.314576223032!2d-117.36524167366714!3d34.46918626984016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c366223d5c6baf%3A0x8bd8fae0adc9699c!2s12044%20Dunia%20Rd%20F%2C%20Victorville%2C%20CA%2092392!5e0!3m2!1sen!2sus!4v1741927695856!5m2!1sen!2sus"
              sx={{
                width: "100%",
                height: 400,
                border: "none",
                display: "block"
              }}
              allowFullScreen
              loading="lazy"
            />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};

export default Home;
