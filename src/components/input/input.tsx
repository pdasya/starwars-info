import { FC } from "react";
import style from "./input.module.css";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegister<any>;
  validation?: object;
  error?: FieldError;
}

const Input: FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  register,
  validation,
  error,
}) => {
  return (
    <div className={style.formGroup}>
      <input
        type={type}
        className={style.formField}
        placeholder={label}
        id={id}
        {...register(id, validation)}
      />
      <label htmlFor={id} className={style.formLabel}>
        {label}
      </label>
      {error && <span className={style.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default Input;
