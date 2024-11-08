import React from 'react';
import styles from './styles.module.scss';

export default function VerifyPage({ user }) {
  const resendVerification = async () => {
    try {
      const res = await fetch(`/api/send-email/${user.id}`);
      if (res.ok) {
        console.log('Email send successfully.');
      } else {
        console.error('Failed to send email.');
      }
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  return (
    <div className={styles.verify_page}>
      <p>An email has been sent to you. Please verify your account.</p>
      <button
        className={styles.verify_page__resend_button}
        onClick={resendVerification}
      >
        Re-send Confirmation Email
      </button>
    </div>
  );
}
