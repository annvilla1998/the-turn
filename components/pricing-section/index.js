import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  useTheme
} from "@mui/material";

export default function PricingSection() {
  const theme = useTheme();

  const membershipTiers = [
    {
      plan: "Starter",
      price: "$49",
      credits: "4",
      value: "$68",
      link: "https://theturnvv.golfoclock.com/purchase/mem-a11b46ae-ea67-4190-96cd-80d7b9ac5687"
    },
    {
      plan: "Player",
      price: "$99",
      credits: "9",
      value: "$153",
      link: "https://theturnvv.golfoclock.com/purchase/mem-f0480b87-4528-46c8-a0ef-7e41be611f00"
    },
    {
      plan: "Plus",
      price: "$150",
      credits: "15",
      value: "$255",
      link: "https://theturnvv.golfoclock.com/purchase/mem-cd5e6dd1-2d0d-4147-9e78-7f62b0e8925d"
    },
    {
      plan: "Elite",
      price: "$299",
      credits: "30",
      value: "$510",
      link: "https://theturnvv.golfoclock.com/purchase/mem-50fa5d83-c9a0-4578-a517-9edc1f51f5b7"
    }
  ];

  return (
    <Box id="pricing" mt={10} sx={{ position: "relative", zIndex: 1 }}>
      <Container maxWidth="lg">
        {/* Per-Person Pricing */}
        <Paper
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            border: `1px solid rgba(196, 253, 60, 0.2)`,
            p: 4,
            mb: 4,
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
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: theme.palette.common.white,
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${theme.palette.common.white}, ${theme.palette.custom.logoLightGreen})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3
            }}
          >
            PER-PERSON PRICING
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.custom.logoLightGreen,
                    fontWeight: "bold"
                  }}
                >
                  Mon-Thu
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: "bold"
                  }}
                >
                  $12/hr per person
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.custom.logoLightGreen,
                    fontWeight: "bold"
                  }}
                >
                  Fri-Sun
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: "bold"
                  }}
                >
                  $17/hr per person
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography
              sx={{
                color: theme.palette.common.white,
                opacity: 0.9,
                mb: 1
              }}
            >
              Solo players pay less. Groups scale fairly.
            </Typography>
            <Typography
              sx={{ color: theme.palette.common.white, opacity: 0.9 }}
            >
              Bay caps keep things affordable.
            </Typography>
          </Box>
        </Paper>

        {/* Membership Credit Packs */}
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
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: theme.palette.common.white,
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${theme.palette.common.white}, ${theme.palette.custom.logoLightGreen})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3
            }}
          >
            MEMBERSHIP CREDIT PACKS
          </Typography>

          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography sx={{ color: theme.palette.common.white, mb: 1 }}>
              One credit = one hour of play for one person.
            </Typography>
            <Typography sx={{ color: theme.palette.common.white, mb: 1 }}>
              Redeem anytime - no peak/off-peak restrictions.
            </Typography>
            <Typography sx={{ color: theme.palette.common.white }}>
              Share credits with friends.
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {membershipTiers.map((tier, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: 3,
                    border: `2px solid ${theme.palette.custom.logoLightGreen}`,
                    p: 3,
                    textAlign: "center",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: `0 8px 25px rgba(196, 253, 60, 0.3)`
                    }
                  }}
                  onClick={() => window.open(tier.link, "_blank")}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.custom.logoLightGreen,
                      fontWeight: "bold",
                      mb: 2
                    }}
                  >
                    {tier.plan}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: "bold",
                      mb: 1
                    }}
                  >
                    {tier.price}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.common.white,
                      opacity: 0.8,
                      mb: 2
                    }}
                  >
                    {tier.credits} Credits
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.custom.logoLightGreen,
                      fontSize: "0.9rem"
                    }}
                  >
                    Value: {tier.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Member Perks */}
          <Box sx={{ mt: 5 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{
                color: theme.palette.custom.logoLightGreen,
                fontWeight: "bold",
                mb: 3
              }}
            >
              Member Perks:
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ color: theme.palette.common.white }}>
                  <Typography sx={{ mb: 1 }}>• Priority booking</Typography>
                  <Typography sx={{ mb: 1 }}>
                    • Share credits with friends
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ color: theme.palette.common.white }}>
                  <Typography sx={{ mb: 1 }}>
                    • Free guest pass each month (Player tier & above)
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    • 10% off drinks/snacks
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Example Savings */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.custom.logoLightGreen,
                fontWeight: "bold",
                mb: 2
              }}
            >
              Example Savings
            </Typography>
            <Typography sx={{ color: theme.palette.common.white, mb: 1 }}>
              4 friends on Friday night:
            </Typography>
            <Typography
              sx={{ color: theme.palette.common.white, opacity: 0.8 }}
            >
              Non-members = $68/hr.
            </Typography>
            <Typography
              sx={{
                color: theme.palette.custom.logoLightGreen,
                fontWeight: "bold"
              }}
            >
              Player Member = Uses 4 credits ($0 extra)
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
