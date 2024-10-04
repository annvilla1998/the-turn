import React, { useState } from 'react';
import styles from '@/styles/Book.module.scss';
import { Form, Formik } from 'formik';
import SecondaryHeader from '@/components/layouts/SecondaryHeader';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Input from '@/components/inputs/input';

const initial = {
  date: new Date(),
  time: '',
};
export default function Book() {
  const [value, onChange] = useState(new Date());
  const { date, time } = initial;
  return (
    <div>
      <Formik enableReinitialize initialValues={{ date, time }}>
        {(form) => (
          <Form>
            <Calendar onChange={onChange} value={value} />
            <Input type="time" name="time" label="Time" />
          </Form>
        )}
      </Formik>
    </div>
  );
}

Book.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
