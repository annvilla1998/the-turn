import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearMessages } from "../../store/user";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import Button from "../../components/buttons/button";
import Input from "../../components/inputs/input";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import SignInContainer from "@/components/sign-in";
import Link from "next/link";
import { Alert } from "@mui/material";
import Router from "next/router";
import { logError } from "@/utils/logger";

const initialVal = {
  name: "",
  email: "",
  password: "",
  conf_password: ""
};

export default function SignUp() {
  const [formValues, setFormValues] = useState(initialVal);
  const dispatch = useDispatch();
  const {
    isLoading,
    resetSuccess: success,
    error
  } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Please enter your name.")
      .min(2, "First name must be between 2 and 50 characters.")
      .max(50, "First name must be between 2 and 50 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required("Please enter your email address.")
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and special characters."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match.")
  });

  const signUpHandler = async (values) => {
    const { name, email, password } = values;

    try {
      const signUpResult = await dispatch(signUp({ name, email, password }));

      if (signUpResult?.error) {
        logError("Sign-up error:", signUpResult.error);
        return;
      }

      let options = {
        redirect: false,
        email: values.email,
        password: values.password
      };

      const res = await signIn("credentials", options);

      setTimeout(() => {
        if (res?.error) {
          logError("Sign-in error:", res.error);
        } else {
          Router.push("/the-turn/reserve");
        }
      }, 2000);
    } catch (error) {
      logError("Operation failed:", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <SignInContainer loading={isLoading}>
      <Formik
        enableReinitialize
        initialValues={formValues}
        validationSchema={registerValidation}
        onSubmit={signUpHandler}
      >
        {() => (
          <Form>
            <Input
              type="text"
              label="Name"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Email Address"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="conf_password"
              placeholder="Re-Type Password"
              onChange={handleChange}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </div>
      <div>
        <Link href="/the-turn/sign-in">Have an account?</Link>
      </div>
    </SignInContainer>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
