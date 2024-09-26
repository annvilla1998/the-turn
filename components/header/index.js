import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/">
          <img src="" alt="The TurnVV" className={styles.nav__logo} />
        </Link>
        <ul className={styles.nav__list}>
          <li>
            <Link href="/book">Book Now</Link>
          </li>
          <li>
            <Link href="/memberships">Memberships</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/about">About us</Link>
          </li>
          <li>
            <Link href="/gift-cards">Gift Cards</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
