import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Spinner from "../loaders/spinner";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function SignInContainer({ children, loading }) {
  const router = useRouter();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      router.replace("/");
    }
  }, [currentUser, router]);

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
