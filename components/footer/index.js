import React from "react";
import { FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTiktok } from "react-icons/fa";
import {
  Stack,
  useTheme,
  Box,
  Container,
  Typography,
  List,
  ListItem,
  IconButton
} from "@mui/material";
import { Terms } from "./Terms";
import { Privacy } from "./Privacy";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxHeight: "85%",
  height: "auto",
  overflow: "scroll",
  overflowX: "hidden",
  transform: "translate(-50%, -50%)",
  width: "50%",
  boxShadow: 24,
  p: 2,
  borderRadius: 1,
  "@media (max-width:600px)": {
    width: "90%"
  }
};

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      id="contact-us"
      sx={{
        backgroundColor: theme.palette.background.black,
        color: "#fff",
        py: 4,
        px: 2,
        width: "100%"
      }}
    >
      <Container maxWidth="lg" sx={{ px: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexWrap: "wrap"
          }}
        >
          <List
            sx={{
              py: 0.5,
              width: "100%",
              maxWidth: "70%"
            }}
          >
            <ListItem sx={{ pl: 0, py: 1 }}>
              <Stack direction="row" spacing={3}>
                <IconButton
                  component={Link}
                  href="https://www.instagram.com/theturnvv/"
                  sx={{
                    color: "#fff",
                    p: 0,
                    "&:hover": {
                      opacity: 0.8
                    }
                  }}
                >
                  <FaInstagram size={26} />
                </IconButton>
                <IconButton
                  component={Link}
                  href="https://www.tiktok.com/@theturnvv?lang=en"
                  sx={{
                    color: "#fff",
                    p: 0,
                    "&:hover": {
                      opacity: 0.8
                    }
                  }}
                >
                  <FaTiktok size={26} />
                </IconButton>
              </Stack>
            </ListItem>

            <ListItem sx={{ pl: 0, py: 1 }}>
              <Link
                href="tel:760-983-5001"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <FaPhoneAlt size={22} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                  >
                    760-983-5001
                  </Typography>
                </Stack>
              </Link>
            </ListItem>

            <ListItem sx={{ pl: 0, py: 1 }}>
              <Link
                href="mailto:TheTurnVV@gmail.com"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <MdEmail size={22} />
                  <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
                    TheTurnVV@gmail.com
                  </Typography>
                </Stack>
              </Link>
            </ListItem>

            <ListItem sx={{ pl: 0, py: 1 }}>
              <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
                Monday - Friday{" "}
                <Box component="span" fontWeight="bold">
                  10am - 9pm
                </Box>
              </Typography>
            </ListItem>
          </List>

          <Stack
            spacing={2}
            sx={{
              alignSelf: { xs: "flex-start", md: "flex-end" },
              justifyContent: "flex-end",
              mt: 1,
              mb: 1
            }}
          >
            <Privacy style={modalStyle} />
            <Terms style={modalStyle} />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
