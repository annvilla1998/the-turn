import React, { useState } from 'react';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import styles from '@/styles/SignIn.module.scss';
import Button from '../../components/buttons/button';
import LoginInput from '../../components/inputs/loginInput';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from 'next-auth/react';
import * as Yup from 'yup';

const initialVal = {
  login_email: '',
  login_password: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  error: '',
  login_error: '',
};
export default function SignIn({ providers, callbackUrl, csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialVal);

  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  // Login
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required('Email address is required.')
      .email('Please enter a valid email address.'),
    login_password: Yup.string().required('Please enter a password.'),
  });

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn('credentials', options);
    setUser({ ...user, success: '', error: '' });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return Router.push(callbackUrl || '/the-turn');
    }
  };

  return (
    // <>
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.login__header}>
          <img
            className={styles.login__logo}
            src="/images/logo.png"
            alt="The TurnVV"
          />
        </div>
        <div className={styles.login__form}>
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
              <Form method="post" action="/api/auth/sign-in/email">
                <input
                  type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}
                />
                <LoginInput
                  type="text"
                  label="Email Address"
                  name="login_email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
                <LoginInput
                  type="password"
                  label="Password"
                  name="login_password"
                  icon="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <Button type="submit" text="Sign in" />
                {login_error && (
                  <span className={styles.error}>{login_error}</span>
                )}
                <div className={styles.forgot}>
                  <Link href="/auth/forgot">Forgot password?</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    // </>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
