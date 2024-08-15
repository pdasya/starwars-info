import { forwardRef } from "react";
import style from "./select.module.css";

interface SelectFieldProps {
  label: string;
  id: string;
  options: string[];
  error?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, options, error }, ref) => (
    <div className={style.selectWrapper}>
      <label htmlFor={id}>{label}</label>
      <select id={id} className={style.select} ref={ref}>
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  ),
);

export default SelectField;
