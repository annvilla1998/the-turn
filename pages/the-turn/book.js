import React from 'react';
import styles from '@/styles/Book.module.scss';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';

export default function Book() {
  return <div>Book</div>;
}

Book.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
