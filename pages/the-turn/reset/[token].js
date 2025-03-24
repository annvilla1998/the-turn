import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearMessages } from "../../store/user"; // Adjust the path as needed
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import { Form, Formik } from "formik";
import Router from "next/router";
import Spinner from "@/components/loaders/spinner";
import styles from "../../../styles/Reset.module.scss";
import Input from "@/components/inputs/input";
import Button from "@/components/buttons/button";
import * as Yup from 'yup';

const initialValues = {
  password: "",
  confPassword: ""
};

export default function Reset() {
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const { isLoading, resetSuccess: success, error } = useSelector(state => state.user);

  const { password, confPassword } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and special characters."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    confPassword: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const resetPasswordHandler = () => {
    dispatch(resetPassword(password));
  };

  // Handle redirect after successful password reset
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        Router.push("/the-turn/sign-in");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Clear messages when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <div className={styles.reset}>
      {isLoading && <Spinner loading={isLoading} />}
      <div className={styles.reset__container}>
        <p>Reset your password</p>
        <div className={styles.reset__form}>
          <Formik
            enableReinitialize
            initialValues={{
              password,
              confPassword,
            }}
            validationSchema={passwordValidation}
            onSubmit={resetPasswordHandler}
          >
            {(form) => (
              <Form>
                <Input
                  type="password"
                  onChange={handleChange}
                  label="New Password"
                  name="password"
                  placeholder="New Password"
                />
                <Input
                  type="password"
                  onChange={handleChange}
                  label="Confirm New Password"
                  name="confPassword"
                  placeholder="Confirm New Password"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </Form>
            )}
          </Formik>
          <div>{success && <span className="success">{success}</span>}</div>
          <div>{error && <span className="error">{error}</span>}</div>
        </div>
      </div>
    </div>
  );
}

Reset.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};