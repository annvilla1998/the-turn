import React from 'react';
import MainHeader from '@/components/layouts/MainHeader';

export default function Events() {
  return <div>Events</div>;
}

Events.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};
