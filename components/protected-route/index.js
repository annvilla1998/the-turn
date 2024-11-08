import React from 'react';
import { useSelector } from 'react-redux';
import VerifyPage from '../verify-page';
import Router from 'next/router';

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user?.currentUser);

  if (user === null) {
    Router.push('/the-turn/sign-in');
  }

  if (user !== null && user.verified === false) {
    return <VerifyPage user={user} />;
  }
  return children;
}
