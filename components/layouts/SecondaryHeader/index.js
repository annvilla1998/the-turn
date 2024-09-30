import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useSession, signOut, signIn } from 'next-auth/react';

export default function SecondaryHeader({ children }) {
  const { data: session } = useSession();

  return (
    <header>
      <nav className={styles.book_nav}>
        <Link href="/">Home</Link>
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
            <div className={styles.book_nav__profile}>
              <p>Hi, {session?.user?.name}!</p>
              <span onClick={() => signOut()}>Sign Out</span>
            </div>
          ) : (
            <Link href="/the-turn/sign-in">Sign In</Link>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </header>
  );
}
