import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationEmail, clearMessages } from "../../store/user";
import Button from "@/components/buttons/button";
import styles from "./styles.module.scss";

export default function VerifyPage({ user }) {
  const dispatch = useDispatch();
  const { isLoading, verificationMessage } = useSelector((state) => state.user);

  const resendVerification = () => {
    dispatch(resendVerificationEmail(user.email));
  };

  // Clear messages when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <div className={styles.verify_page}>
      <p>An email has been sent to you. Please verify your account.</p>
      <div className={styles.verify_page__resend_button}>
        <div>
          {verificationMessage?.success && (
            <span className="success">{verificationMessage.success}</span>
          )}
        </div>
        <div>
          {verificationMessage?.error && (
            <span className="error">{verificationMessage.error}</span>
          )}
        </div>
        <Button onClick={resendVerification} disabled={isLoading}>
          {isLoading ? "Sending..." : "Re-send Confirmation Email"}
        </Button>
      </div>
    </div>
  );
}