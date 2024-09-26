import React from 'react';
import styles from '@/styles/TheTurn.module.scss';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';

function TheTurn() {
  return <div></div>;
}

TheTurn.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};

export default TheTurn;
