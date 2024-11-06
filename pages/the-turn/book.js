import React, { useState } from 'react';
import styles from '@/styles/Book.module.scss';
import { Form, Formik } from 'formik';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimeButton from '@/components/buttons/timeButton';

const initial = {
  date: new Date(),
  time: '',
};
export default function Book() {
  const [value, onChange] = useState(new Date());
  const { date, time } = initial;

  const now = new Date();
  const next30Days = now.getTime() + 30 * 24 * 60 * 60 * 1000;
  const next30DaysTimestamp = new Date(next30Days);

  return (
    <div className={styles.book}>
      <h1>Reserve</h1>
      <Formik enableReinitialize initialValues={{ date, time }}>
        {(form) => (
          <Form>
            <div className={styles.book__calendar}>
              <Calendar
                maxDate={next30DaysTimestamp}
                minDate={new Date()}
                onChange={onChange}
                value={value}
              />
              <div className={styles.book__available_times}>
                <TimeButton time={'10:00 am'} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

Book.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
