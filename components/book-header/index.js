import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function BookHeader() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className={styles.book_nav}>
        <Link href="/">
          <img src="" alt="The TurnVV" className={styles.book_nav__logo} />
        </Link>
        <ul className={styles.book_nav__list}>
          <li>
            <Link href="/book">Book Now</Link>
          </li>
          <li>
            <Link href="/gift-cards">Buy Gift Card</Link>
          </li>
          {session ? (
            <Link href="/sign-out">Sign Out</Link>
          ) : (
            <Link href="/sign-in">Sign In</Link>
          )}
        </ul>
      </nav>
    </header>
  );
}
