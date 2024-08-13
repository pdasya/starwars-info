import { FC } from "react";
import style from "./input.module.css";
import { FieldError } from "react-hook-form";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  //   register: ReturnType<typeof import('react-hook-form')['useForm']>['register'];
  validation?: object;
  error?: FieldError;
}

const Input: FC<InputFieldProps> = ({ label, id, type = "text" }) => {
  return (
    <div className={style.formGroup}>
      <input
        type={type}
        className={style.formField}
        placeholder={label}
        id={id}
      />
      <label htmlFor={id} className={style.formLabel}>
        {label}
      </label>
    </div>
  );
};

export default Input;
