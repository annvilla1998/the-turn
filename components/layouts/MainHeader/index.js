import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import Footer from "@/components/footer";
import { Box, Modal, Typography, useTheme } from "@mui/material";
import Button from "@/components/buttons/button";

const menuUrls = [
  // { link: "/the-turn/reserve", label: "Reserve" },
  {
    link: "https://theturnvv.golfoclock.com/",
    label: "Reserve"
  },
  { link: "#memberships", label: "Memberships" },
  // { link: '/events', label: 'Events' },
  // { link: "/the-turn/gift-cards", label: "Gift Cards" },
  // { link: '/about-us', label: 'About Us' },
  { link: "#contact-us", label: "Contact Us" }
];

export default function MainHeader({ children }) {
  const theme = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [showSubscribed, setShowSubscribed] = useState(false);

  return (
    <>
      <header>
        <nav
          style={{ background: theme?.palette?.custom?.navColor }}
          className={`${styles.nav} ${showMenu ? styles.nav__menu : ""}`}
        >
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="The TurnVV"
              className={styles.nav__logo}
            />
          </Link>
          <ul className={styles.nav__list}>
            {menuUrls.map((item, i) => {
              let { link, label } = item;

              return (
                <li key={i}>
                  <Link
                    target={label === "Reserve" ? "_blank" : null}
                    href={link}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <IoIosMenu
            onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
          />
        </nav>
      </header>
      <Modal
        open={showSubscribed}
        onClose={() => setShowSubscribed(false)}
        aria-labelledby="Subscribed"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "background.paper",
            boxShadow: 24,
            textAlign: "center",
            p: 4
          }}
        >
          <Typography sx={{ mb: 2 }}>You've already subscribed!</Typography>
          <Button onClick={() => setShowSubscribed(false)}>Close</Button>
        </Box>
      </Modal>
      <main>{children}</main>
      <Footer />
    </>
  );
}
