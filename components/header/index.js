import React from "react";
import styles from  './styles.module.scss';
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className={styles.nav}>
          <img src="" alt="The TurnVV" className={styles.nav__logo} />
          <ul className={styles.nav__list}>
            <li><Link href="/reserve">Book Now</Link></li>
            <li><Link href="/memberships">Memberships</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/gift-cards">Gift Cards</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
      </nav>
    </header>
  );
}
