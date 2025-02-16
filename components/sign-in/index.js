import React, { useState } from "react";
import styles from "./styles.module.scss";
import Spinner from "../loaders/spinner";
import Link from 'next/link';

export default function SignInContainer({ children, loading }) {
  return (
    <>
      {loading && <Spinner loading={loading} />}
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <Link href="/">
              <img
                className={styles.login__logo}
                src="/images/logo.png"
                alt="The TurnVV"
              />
            </Link>
          </div>
          <div className={styles.login__form}>{children}</div>
        </div>
      </div>
    </>
  );
}
