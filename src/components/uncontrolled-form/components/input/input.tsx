import { forwardRef } from "react";
import style from "./input.module.css";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, type = "text", error }, ref) => {
    return (
      <div className={style.formGroup}>
        <input
          type={type}
          className={style.formField}
          placeholder={label}
          id={id}
          ref={ref}
        />
        <label htmlFor={id} className={style.formLabel}>
          {label}
        </label>
        {error && <span className={style.errorMessage}>{error}</span>}
      </div>
    );
  },
);

export default Input;
