import React from "react";
import { FaInstagram } from "react-icons/fa6";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer id="contact-us" className={styles.footer}>
      <h3>Contact</h3>
      <ul>
        <li>
          <Link
            className={styles.footer__instagram}
            href="https://www.instagram.com/theturnvv/"
          >
            <FaInstagram />
            Follow Us!
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
        <li>Hours: Monday-Friday 10am-9am</li>
        <li>Special times for corporate event rentals</li>
      </ul>
    </footer>
  );
}
