import React from "react";
import styles from "./styles.module.scss";
import { FadeLoader } from "react-spinners";

export default function Spinner({ loading }) {
  return (
    <div className={styles.loader}>
      <FadeLoader color="#636363" loading={loading} />
    </div>
  );
}
