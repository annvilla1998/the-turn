import React from 'react';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import styles from '@/styles/Membership.module.scss';

export default function Membership() {
  return <div>Membership</div>;
}

Membership.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
