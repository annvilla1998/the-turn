import React from "react";
import MainHeader from "@/components/layouts/MainHeader";
import { ImageCarousel } from "@/components/image-carousel";
import Memberships from "@/components/memberships";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  Chip,
  Paper
} from "@mui/material";
import { GolfCourse, Groups, LocationOn } from "@mui/icons-material";

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
      {/* Modern Hero Section with Text Overlay */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, mb: 8 }}>
        <Box
          sx={{
            position: "relative",
            minHeight: "50vh",
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            backgroundImage: "url(/images/gameplay.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(11,17,67,0.8) 50%, rgba(0,0,0,0.6) 100%)",
              zIndex: 1
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 30% 70%, ${theme.palette.custom.logoLightGreen}20 0%, transparent 50%)`,
              zIndex: 2
            }
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              position: "relative",
              zIndex: 3,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              py: 4,
              "@media (min-width: 900px)": {
                py: 6,
                minHeight: "50vh"
              }
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              fontWeight="bold"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.common.white}, ${theme.palette.custom.logoLightGreen})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 3,
                fontSize: "2.5rem",
                textShadow: "0 4px 20px rgba(0,0,0,0.30)",
                "@media (min-width: 900px)": {
                  fontSize: "3.5rem"
                }
              }}
            >
              Welcome to The Turn!
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: theme.palette.custom.logoLightGreen,
                fontWeight: "bold",
                mb: 4,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)"
              }}
            >
              The ultimate indoor golf simulator lounge where technology meets
              recreation
            </Typography>

            {/* Feature Chips */}
            <Box
              sx={{
                mb: 4,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <Chip
                icon={<GolfCourse />}
                label="Premium Simulators"
                size="medium"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.custom.logoDarkGreen}, ${theme.palette.custom.logoLightGreen})`,
                  color: theme.palette.common.white,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 1,
                  px: 2,
                  "& .MuiChip-icon": { color: theme.palette.common.white }
                }}
              />
              <Chip
                icon={<Groups />}
                label="Social Experience"
                size="medium"
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.custom.logoLightGreen}, ${theme.palette.custom.logoDarkGreen})`,
                  color: theme.palette.common.white,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  py: 1,
                  px: 2,
                  "& .MuiChip-icon": { color: theme.palette.common.white }
                }}
              />
            </Box>

            <Typography
              variant="h6"
              lineHeight={1.8}
              sx={{
                color: theme.palette.common.white,
                opacity: 0.95,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                maxWidth: "800px",
                mx: "auto"
              }}
            >
              Experience the future of golf in a relaxed, social
              atmosphere—whether you're an avid golfer or a newcomer, we've got
              something for everyone.
            </Typography>
          </Container>
        </Box>
      </Container>

      {/* Additional Content Section */}
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
                highly accurate, real-time data on ball speed, spin, launch
                angle, and more, giving you the insights you need to refine your
                game or simply enjoy a fun, stress-free round.
                <br />
                <br />
                Whether you're looking to work on your swing, compete with
                friends, or unwind with a casual round in a comfortable and
                stylish environment, The Turn offers the perfect space.
                Featuring a variety of virtual courses from around the world,
                our simulators create an authentic golfing experience, all while
                you relax with food, drinks, and entertainment. Our lounge is
                ideal for corporate events, casual hangouts, or golf lessons
                with expert instructors (coming soon).
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Grand Opening Video Section */}
      <Box mt={10} sx={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Box
          component="video"
          controls
          sx={{
            width: "100%",
            maxHeight: "60vh",
            display: "block",
            boxShadow: "0 15px 30px rgba(0,0,0,0.4)"
          }}
          poster="/images/gameplay.jpg" // Fallback poster image
        >
          <source src="/mp4/grand-opening.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      </Box>

      {/* Memberships Section */}
      <Box id="memberships" mt={10} sx={{ position: "relative", zIndex: 1 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              border: `1px solid rgba(196, 253, 60, 0.2)`,
              p: 4,
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "2px",
                background: `linear-gradient(90deg, ${theme.palette.custom.logoLightGreen}, ${theme.palette.custom.logoDarkGreen})`
              }
            }}
          >
            <Memberships />
          </Paper>
        </Container>
      </Box>

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
