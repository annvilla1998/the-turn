import React from 'react';
import styles from './styles.module.scss';

export default function TimeButton({ time }) {
  return <button className={styles.time_button}>{time}</button>;
}
