import React from 'react';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import styles from '@/styles/GiftCards.module.scss';

export default function GiftCards() {
  return <div>Gift Cards</div>;
}

GiftCards.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
