import React, { useState } from 'react';
import styles from '@/styles/Book.module.scss';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import Calendar from 'react-calendar';
export default function Book() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

Book.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
