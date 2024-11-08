import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../store/user';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import Button from '../../components/buttons/button';
import Input from '../../components/inputs/input';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import { signIn } from 'next-auth/react';
import * as Yup from 'yup';
import SignInContainer from '@/components/sign-in';
import axios from 'axios';
import Link from 'next/link';

const initialVal = {
  name: '',
  email: '',
  password: '',
  conf_password: '',
  verified: false,
  success: '',
  error: '',
};
export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialVal);
  const dispatch = useDispatch();

  const { name, email, password, conf_password, success, error } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    name: Yup.string()
      .required('Please enter your name.')
      .min(2, 'First name must be between 2 and 50 characters.')
      .max(50, 'First name must be between 2 and 50 characters.')
      .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required('Please enter your email address.')
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and special characters.'
      )
      .min(6, 'Password must be at least 6 characters.')
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
      dispatch(fetchUser(email));
      setUser({ ...user, error: '', success: data.message });
      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn('credentials', options);
        Router.push('/the-turn/book');
      }, 2000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: '', error: error.message });
    }
  };

  return (
    <SignInContainer loading={loading}>
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
            <Input
              type="text"
              label="Name"
              name="name"
              icon="user"
              placeholder="Full Name"
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Email Address"
              name="email"
              icon="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              icon="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="conf_password"
              icon="password"
              placeholder="Re-Type Password"
              onChange={handleChange}
            />
            <Button type="submit">Sign Up</Button>
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
