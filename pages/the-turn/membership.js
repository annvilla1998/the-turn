import React from 'react';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import styles from '@/styles/Membership.module.scss';
import ProtectedRoute from '@/components/protected-route';

export default function Membership() {
  return (
    <div className="coming-soon">
      <h1>COMING SOON</h1>
    </div>
    // <ProtectedRoute>
    //   <div>Membership</div>
    // </ProtectedRoute>
  );
}

Membership.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
