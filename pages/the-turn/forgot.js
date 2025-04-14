import React, { useState } from "react";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import styles from "../../styles/Forgot.module.scss";
import Button from "@/components/buttons/button";
import Link from "next/link";
import Input from "@/components/inputs/input";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "@mui/material";
import { logError } from "@/utils/logger";

export default function Forgot() {
  const [message, setMessage] = useState({ success: null, error: null });
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;

    setEmail(value);
  };

  const sendForgotPassword = async () => {
    try {
      await fetch(`/api/send-email/${email}?purpose=password-reset`).then(
        async (res) => {
          const data = await res.json();
          if (!res.ok) {
            setMessage({
              error: data.message,
              success: null
            });
            logError("Failed to send email.");
          } else {
            setMessage({
              success: data.message,
              error: null
            });
          }
        }
      );
    } catch (e) {
      logError("Error: ", e);
    }
  };
  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address.")
  });

  return (
    <div className={styles.forgot}>
      <div className={styles.forgot__container}>
        <p>
          Forgot your password? Otherwise{" "}
          <Link href="/the-turn/sign-in">sign in</Link>
        </p>
        <div className={styles.forgot__input}>
          <Formik
            enableReinitialize
            initialValues={{
              email
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              sendForgotPassword();
            }}
          >
            {() => (
              <Form>
                <Input
                  type="text"
                  onChange={handleChange}
                  label="Enter your email"
                  name="email"
                  placeholder="Email Address"
                />
                <Button type="submit">Reset Password</Button>
              </Form>
            )}
          </Formik>
          <div>
            {message.error && <Alert severity="error">{message.error}</Alert>}
            {message.success && (
              <Alert severity="success">{message.success}</Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Forgot.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
