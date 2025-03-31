import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/user";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import Button from "../../components/buttons/button";
import Input from "../../components/inputs/input";
import Link from "next/link";
import { Form, Formik } from "formik";
import Router from "next/router";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import * as Yup from "yup";
import SignInContainer from "@/components/sign-in";

const initialVal = {
  login_email: "",
  login_password: "",
  login_error: "",
};
export default function SignIn({ callbackUrl, csrfToken }) {
  const [user, setUser] = useState(initialVal);
  const [loading, setLoading] = useState(false);
  const { login_email, login_password, login_error } = user;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password."),
  });

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };

    dispatch(fetchUser(login_email));

    const res = await signIn("credentials", options);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res.error });
    } else {
      // Redirect after successful login
      // Wait for the session to be updated
      const session = await getSession();
      if (session) {
        Router.push(callbackUrl || "/the-turn/reserve");
      } else {
        // Handle case where session is not available
        setUser({
          ...user,
          login_error: "Authentication failed. Please try again.",
        });
      }
    }
    setLoading(false);
  };

  return (
    <SignInContainer loading={loading}>
      <Formik
        enableReinitialize
        initialValues={{
          login_email,
          login_password,
        }}
        validationSchema={loginValidation}
        onSubmit={() => {
          signInHandler();
        }}
      >
        {(form) => (
          <Form method="post" action="/api/auth/signin/email">
            <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
            <Input
              type="text"
              label="Email Address"
              name="login_email"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password"
              name="login_password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Button type="submit">Sign In</Button>
            {login_error && <span className="error">{login_error}</span>}
            <div>
              <Link href="/the-turn/forgot">Forgot password?</Link>
            </div>
            <div>
              <Link href="/the-turn/sign-up">Dont have an account?</Link>
            </div>
          </Form>
        )}
      </Formik>
    </SignInContainer>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};

export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  const { callbackUrl } = query;
  let admin;

  if (session) {
    admin = session.user.role === "admin";
  }
  // Get CSRF token for authentication
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken,
      callbackUrl: admin
        ? "/the-turn/admin/dashboard"
        : callbackUrl || "/the-turn/reserve",
    },
  };
}
