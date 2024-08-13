import React from "react";
import { FieldError } from "react-hook-form";
import style from "./select.module.css";

interface SelectFieldProps {
  label: string;
  id: string;
  options: string[];
  //   register: ReturnType<typeof import('react-hook-form')['useForm']>['register'];
  validation?: object;
  error?: FieldError;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  options,
  error,
}) => (
  <div className={style.selectWrapper}>
    <label htmlFor={id}>{label}</label>
    <select id={id} className={style.select}>
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span>{error.message}</span>}
  </div>
);

export default SelectField;
