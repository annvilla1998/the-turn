import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { IoIosMenu } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { signOutReducer } from '../../../store/user';

const menuUrls = [
  { link: '/the-turn/book', label: 'Book Now' },
  { link: '/the-turn/membership', label: 'Buy Membership' },
  { link: '/the-turn/gift-cards', label: 'Buy Gift Card' },
];

export default function SecondaryHeader({ children }) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOutReducer());
    signOut();
  };

  return (
    <header>
      <nav
        className={`${styles.book_nav} ${showMenu ? styles.book_nav__menu : ''}`}
      >
        <Link href="/">Home</Link>

        <ul className={styles.book_nav__list}>
          {menuUrls.map((item, i) => {
            const { link, label } = item;

            return (
              <li key={i}>
                <Link onClick={() => setShowMenu(false)} href={link}>
                  {label}
                </Link>
              </li>
            );
          })}
          {session ? (
            <div className={styles.book_nav__profile}>
              <p>Hi, {session?.user?.name}!</p>
              <span onClick={signOutHandler}>Sign Out</span>
            </div>
          ) : (
            <Link onClick={() => setShowMenu(false)} href="/the-turn/sign-in">
              Sign In
            </Link>
          )}
        </ul>
        <IoIosMenu
          onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
        />
      </nav>
      <main>{children}</main>
    </header>
  );
}
