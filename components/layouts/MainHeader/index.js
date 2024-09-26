import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function MainHeader({ children }) {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/">
          <img src="" alt="The TurnVV" className={styles.nav__logo} />
        </Link>
        <ul className={styles.nav__list}>
          <li>
            <Link href="/the-turn/book">Book Now</Link>
          </li>
          <li>
            <Link href="/memberships">Memberships</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/the-turn/gift-cards">Gift Cards</Link>
          </li>
          <li>
            <Link href="/about-us">About us</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </header>
  );
}
