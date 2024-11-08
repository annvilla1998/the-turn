import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '../buttons/button';

export default function VerifyPage({ user }) {
  const [message, setMessage] = useState({ success: null, error: null });

  const resendVerification = async () => {
    try {
      const res = await fetch(`/api/send-email/${user.id}`);
      if (res.ok) {
        console.log('Email sent successfully.');
        setMessage({ success: 'Message re-sent', error: null });
      } else {
        setMessage({ error: 'Message re-sent', success: null });
        console.error('Failed to send email.');
      }
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  return (
    <div className={styles.verify_page}>
      <p>An email has been sent to you. Please verify your account.</p>
      <div className={styles.verify_page__resend_button}>
        <div>
          {message.success && (
            <span className="success">{message.success}</span>
          )}
        </div>
        <div>
          {message.error && <span className="error">{message.error}</span>}
        </div>
        <Button onClick={resendVerification}>Re-send Confirmation Email</Button>
      </div>
    </div>
  );
}
