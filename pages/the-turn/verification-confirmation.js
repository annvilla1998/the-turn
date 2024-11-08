import React, { useEffect } from 'react';
import styles from '../../styles/VerificationConfirmation.module.scss';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import { useRouter } from 'next/navigation';
import { setVerified } from '@/store/user';
import { useDispatch } from 'react-redux';

export default function VerificationConfirmation() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVerified());
    const timer = setTimeout(() => {
      router.push('/the-turn/book');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={styles.verification_message}>
      Verification successful. Redirecting...
    </div>
  );
}

VerificationConfirmation.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
