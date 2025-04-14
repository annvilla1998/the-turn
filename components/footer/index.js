import React from "react";
import { FaInstagram } from "react-icons/fa6";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTiktok } from "react-icons/fa";
import { Stack, useTheme } from "@mui/material";
import { Terms } from "./Terms";
import { Privacy } from "./Privacy";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "80%",
  overflow: "scroll",
  transform: "translate(-50%, -50%)",
  width: "50%",
  boxShadow: 24,
  p: 4
};

export default function Footer() {
  const theme = useTheme();

  return (
    <footer
      style={{ backgroundColor: theme.palette.background.black }}
      id="contact-us"
      className={styles.footer}
    >
      <div className={styles.footer__content}>
        <ul>
          <li className={styles.footer__icons}>
            <Link href="https://www.instagram.com/theturnvv/">
              <FaInstagram />
            </Link>
            <Link href="https://www.tiktok.com/@theturnvv?lang=en">
              <FaTiktok />
            </Link>
          </li>
          <li>
            <Link className={styles.footer__contact} href="tel:760-983-5001">
              <FaPhoneAlt /> 760-983-5001
            </Link>
          </li>
          <li>
            <Link
              className={styles.footer__contact}
              href="mailto:TheTurnVV@gmail.com"
            >
              <MdEmail /> TheTurnVV@gmail.com
            </Link>
          </li>
          <li>
            <p>
              Monday - Friday <strong>10am - 9pm</strong>
            </p>
          </li>
        </ul>
        <Stack className={styles.footer__terms} spacing={1}>
          <Privacy style={style} />
          <Terms style={style} />
        </Stack>
      </div>
    </footer>
  );
}
