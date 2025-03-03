import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import Footer from "@/components/footer";

const menuUrls = [
  { link: "/the-turn/book", label: "Book Now" },
  // { link: '/memberships', label: 'Memberships' },
  // { link: '/events', label: 'Events' },
  { link: "/the-turn/gift-cards", label: "Gift Cards" },
  // { link: '/about-us', label: 'About Us' },
  { link: "#contact-us", label: "Contact Us" },
];

export default function MainHeader({ children }) {
  const [showMenu, setShowMenu] = useState(false);

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
              const { link, label } = item;

              return (
                <li key={i}>
                  <Link onClick={() => setShowMenu(false)} href={link}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <IoIosMenu
            onClick={() => (showMenu ? setShowMenu(false) : setShowMenu(true))}
          />
        </nav>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
