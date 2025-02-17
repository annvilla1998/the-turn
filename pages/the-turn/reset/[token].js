import React, { useState } from "react";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import { Form, Formik } from "formik";
import Router from "next/router";
import Spinner from "@/components/loaders/spinner";
import styles from "../../../styles/Reset.module.scss";
import Input from "@/components/inputs/input";
import Button from "@/components/buttons/button";
import axios from 'axios';
import * as Yup from 'yup';

const initialValues = {
  password: "",
  confPassword: "",
  success: "",
  error: "",
};

export default function Reset() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);

  const { password, confPassword, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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

  const resetPasswordHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/auth/reset`, {
        newPassword: password,
      });
      setUser({ ...user, error: "", success: data.message });
      setTimeout(async () => {
        Router.push("/the-turn/sign-in");
      }, 2000);
    } catch (e) {
      setLoading(false);
      setUser({ ...user, success: "", error: e.message });
    }
  };

  return (
    <div className={styles.reset}>
      {loading && <Spinner loading={loading} />}
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
            onSubmit={() => resetPasswordHandler()}
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
                <Button type="submit">Reset Password</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

Reset.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
