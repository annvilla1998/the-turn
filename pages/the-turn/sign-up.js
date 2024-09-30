import React, { useState } from 'react';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import styles from '@/styles/SignIn.module.scss';
import Button from '../../components/buttons/button';
import LoginInput from '../../components/inputs/loginInput';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import SignInContainer from '@/components/sign-in';
import axios from 'axios';

const initialVal = {
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  error: '',
};
export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialVal);

  const { name, email, password, conf_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    name: Yup.string()
      .required('Please enter your name.')
      .min(2, 'First name must be between 2 and 16 characters.')
      .max(16, 'First name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required('Please enter your email address.')
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and special characters.'
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/auth/sign-up', {
        name,
        email,
        password,
      });
      setUser({ ...user, error: '', success: data.message });
      setLoading(false);
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn('credentials', options);
        Router.push('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: '', error: error.response.data.message });
    }
  };

  return (
    <SignInContainer>
      <Formik
        enableReinitialize
        initialValues={{
          name,
          email,
          password,
          conf_password,
        }}
        validationSchema={registerValidation}
        onSubmit={() => {
          signUpHandler();
        }}
      >
        {(form) => (
          <Form>
            <LoginInput
              type="text"
              label="Name"
              name="name"
              icon="user"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <LoginInput
              type="text"
              label="Email Address"
              name="email"
              icon="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <LoginInput
              type="password"
              label="Password"
              name="password"
              icon="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <LoginInput
              type="password"
              label="Confirm Password"
              name="conf_password"
              icon="password"
              placeholder="Re-Type Password"
              onChange={handleChange}
            />
            <Button type="submit" text="Sign up" />
          </Form>
        )}
      </Formik>
      <div>{success && <span className={styles.success}>{success}</span>}</div>
      <div>{error && <span className={styles.error}>{error}</span>}</div>
    </SignInContainer>
  );
}

SignUp.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
