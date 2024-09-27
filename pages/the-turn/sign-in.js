import React, { useState } from 'react';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import styles from '@/styles/SignIn.module.scss';

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
  return (
    <>
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <img
              className={styles.login__logo}
              src="/images/logo.png"
              alt="The TurnVV"
            />
          </div>
        </div>
      </div>
    </>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
