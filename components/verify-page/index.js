import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationEmail, clearMessages } from "../../store/user";
import Button from "@/components/buttons/button";
import styles from "./styles.module.scss";
import { Alert } from "@mui/material";

export default function VerifyPage({ user }) {
  const dispatch = useDispatch();
  const { isLoading, verificationMessage } = useSelector((state) => state.user);

  const resendVerification = () => {
    dispatch(resendVerificationEmail(user.email));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <div className={styles.verify_page}>
      <p>An email has been sent to you. Please verify your account.</p>
      <div className={styles.verify_page__resend_button}>
        {verificationMessage?.success && (
          <Alert severity="success">{verificationMessage.success}</Alert>
        )}
        {verificationMessage?.error && (
          <Alert severity="error">{verificationMessage.error}</Alert>
        )}
        <Button onClick={resendVerification} disabled={isLoading}>
          {isLoading ? "Sending..." : "Re-send Confirmation Email"}
        </Button>
      </div>
    </div>
  );
}
