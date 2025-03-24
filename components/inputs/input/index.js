import { TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { useField } from "formik";

export default function Input({ label, placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${styles.login_input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >
      <TextField
        sx={{
          margin: "10px 0",
        }}
        required
        size="small"
        id="outlined-basic"
        label={label}
        type={field.type}
        helperText={meta.error}
        name={field.name}
        placeholder={placeholder}
        error={meta.error}
        {...field}
        {...props}
      />
    </div>
  );
}
