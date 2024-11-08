import { BiRightArrowAlt } from 'react-icons/bi';
import styles from './styles.module.scss';

export default function Button({ onClick, type, children }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
