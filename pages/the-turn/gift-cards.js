import React from 'react';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import styles from '@/styles/GiftCards.module.scss';
import ProtectedRoute from '@/components/protected-route';

export default function GiftCards() {
  return (
    <ProtectedRoute>
      <div>Gift Cards</div>
    </ProtectedRoute>
  );
}

GiftCards.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
