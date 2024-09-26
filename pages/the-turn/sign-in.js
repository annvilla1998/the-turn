import React from "react";
import SecondaryHeader from "@/components/layouts/SecondaryHeader";
import styles from '@/styles/SignIn.module.scss';

export default function SignIn() {
  return <div>Sign In</div>;
}

SignIn.getLayout = function getLayout(page) {
  return <SecondaryHeader>{page}</SecondaryHeader>;
};
