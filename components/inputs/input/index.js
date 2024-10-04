import styles from './styles.module.scss';
import { ErrorMessage, useField } from 'formik';

export default function Input({ label, placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${styles.login_input} ${
        meta.touched && meta.error ? styles.error : ''
      }`}
    >
      <label for={label}>{label}</label>
      <input
        id={label}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span></span>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}
