import React from "react";
import { Box, Container, Typography, Chip, useTheme } from "@mui/material";
import { GolfCourse, Groups } from "@mui/icons-material";

export default function HeroSection() {
  const theme = useTheme();

  return (
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
  );
}
