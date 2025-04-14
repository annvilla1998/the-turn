import React, { useEffect, useState } from "react";
import styles from "../../styles/VerificationConfirmation.module.scss";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import Router from "next/router";
import { setVerified } from "@/store/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function VerificationConfirmation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    // Get the verification token and email from the URL
    const { verified } = router.query;

    // Check if this page was accessed from the verification API
    if (!verified || verified !== "true") {
      setMessage("Invalid verification attempt. Redirecting to homepage...");
      const timer = setTimeout(() => {
        Router.push("/");
      }, 2000);

      return () => clearTimeout(timer);
    }

    setMessage("Verification successful. Redirecting...");
    dispatch(setVerified());

    const timer = setTimeout(() => {
      // TODO switch
      // router.push('/the-turn/reserve');
      Router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router.query, dispatch]);

  return <div className={styles.verification_message}>{message}</div>;
}

VerificationConfirmation.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
