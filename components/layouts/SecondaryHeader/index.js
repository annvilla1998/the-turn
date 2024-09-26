import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SecondaryHeader({ children }) {
  const { data: session } = useSession();

  return (
    <header>
      <nav className={styles.book_nav}>
        <Link href="/">
          <img src="" alt="The TurnVV" className={styles.book_nav__logo} />
        </Link>
        <ul className={styles.book_nav__list}>
          <li>
            <Link href="/the-turn/book">Book Now</Link>
          </li>
          <li>
            <Link href="/the-turn/membership">Buy Membership</Link>
          </li>
          <li>
            <Link href="/the-turn/gift-cards">Buy Gift Card</Link>
          </li>
          {session ? (
            <Link href="/the-turn/sign-out">Sign Out</Link>
          ) : (
            <Link href="/the-turn/sign-in">Sign In</Link>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </header>
  );
}
