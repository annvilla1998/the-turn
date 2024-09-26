import React from 'react';
import MainHeader from '@/components/layouts/MainHeader';

export default function ContactUs() {
  return <div>Contact Us</div>;
}

ContactUs.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};
