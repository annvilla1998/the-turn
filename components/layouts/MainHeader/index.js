import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { IoIosMenu } from "react-icons/io";
import Footer from "@/components/footer";
import { markSubscriptionPromptAsSeen } from "@/store/user";
import { Box, Modal, Typography } from "@mui/material";
import Button from "@/components/buttons/button";
import { signOutReducer } from "../../../store/user";
import { signOut } from "next-auth/react";
import Router from "next/router";

const menuUrls = [
  // { link: "/the-turn/reserve", label: "Reserve Now" },
  {
    link: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1-ffmi662iw7iSin3K1u5-txijie6XwYO6m2x5Nd8A75C8qyRxOs8lxqiKIDtt1kvDM6xiDdl-",
    label: "Reserve Now",
  },
  // { link: '/memberships', label: 'Memberships' },
  // { link: '/events', label: 'Events' },
  // { link: "/the-turn/gift-cards", label: "Gift Cards" },
  { label: "Subscribe", link: "/" },
  // { link: '/about-us', label: 'About Us' },
  { link: "#contact-us", label: "Contact Us" },
];

export default function MainHeader({ children }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showSubscribed, setShowSubscribed] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const handleSubscribe = () => {
    if (!user) {
      Router.push("/the-turn/sign-up");
      return;
    }
    
    if (!user.verified) {
      Router.push("/the-turn/reserve");
      return;
    }
    
    if (!user.subscribed) {
      dispatch(markSubscriptionPromptAsSeen(false));
      return;
    }
    
    if (user.subscribed) {
      setShowSubscribed(true);
      return;
    }
  };

  const signOutHandler = () => {
    dispatch(signOutReducer());
    signOut();
  };

  return (
    <>
      <header>
        <nav className={`${styles.nav} ${showMenu ? styles.nav__menu : ""}`}>
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
                    // Remove after booking is implemented
                    target={label === "Reserve Now" ? "_blank" : null}
                    onClick={() => {
                      if (label === "Subscribe") {
                        handleSubscribe();
                      }
                      setShowMenu(false);
                    }}
                    href={link}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              {user && (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    signOutHandler();
                  }}
                  href="#"
                >
                  Log Out
                </Link>
              )}
            </li>
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
            p: 4,
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
