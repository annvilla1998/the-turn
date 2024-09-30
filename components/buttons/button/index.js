import { BiRightArrowAlt } from 'react-icons/bi';
import styles from './styles.module.scss';

export default function Button({ type, text }) {
  return (
    <button className={styles.button} type={type}>
      {text}
    </button>
  );
}
