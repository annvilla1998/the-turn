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
import Router from "next/router";

const initialVal = {
  name: "",
  email: "",
  password: "",
  conf_password: "",
};

export default function SignUp() {
  const [formValues, setFormValues] = useState(initialVal);
  const dispatch = useDispatch();
  const {
    isLoading,
    resetSuccess: success,
    error,
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
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const signUpHandler = async (values) => {
    const { name, email, password } = values;
    
    try {
      // Wait for the signUp action to complete
      const signUpResult = await dispatch(signUp({ name, email, password }));
      
      // Check if the signUp was successful
      // The exact check depends on how your Redux action returns results
      if (signUpResult?.error) {
        console.error("Sign-up error:", signUpResult.error);
        return; // Don't proceed to sign-in if sign-up failed
      }
      
      // Now proceed with sign-in
      let options = {
        redirect: false,
        email: values.email, // Use values from parameter instead of formValues
        password: values.password,
      };
      
      const res = await signIn("credentials", options);

      setTimeout(() => {
        if (res?.error) {
          console.error("Sign-in error:", res.error);
        } else {
          Router.push("/the-turn/book");
        }
      }, 2000);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  return (
    <SignInContainer loading={isLoading}>
      <Formik
        enableReinitialize
        initialValues={formValues}
        validationSchema={registerValidation}
        onSubmit={signUpHandler}
      >
        {(form) => (
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
      <div>{success && <span className="success">{success}</span>}</div>
      <div>{error && <span className="error">{error}</span>}</div>
      <div>
        <Link href="/the-turn/sign-in">Have an account?</Link>
      </div>
    </SignInContainer>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
