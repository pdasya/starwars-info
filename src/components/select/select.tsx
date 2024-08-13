import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import style from "./select.module.css";

interface SelectFieldProps {
  label: string;
  id: string;
  options: string[];
  register: UseFormRegister<any>;
  validation?: object;
  error?: FieldError;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  options,
  register,
  validation,
  error,
}) => (
  <div className={style.selectWrapper}>
    <label htmlFor={id}>{label}</label>
    <select id={id} className={style.select} {...register(id, validation)}>
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className={style.errorMessage}>{error.message}</span>}
  </div>
);

export default SelectField;
