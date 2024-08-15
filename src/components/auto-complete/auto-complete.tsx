import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchCountries } from "../../features/countrySlice";
import { UseFormRegister } from "react-hook-form";
import style from "./auto-complete.module.css";

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  picture: FileList;
  country: string;
}

interface AutocompleteSelectProps {
  id: string;
  label: string;
  register: UseFormRegister<FormData>;
  onChange: (value: string) => void;
  value: string;
}

const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
  id,
  label,
  onChange,
  value,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const status = useSelector((state: RootState) => state.countries.status);

  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const [inputValue, setInputValue] = useState(value);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      setFilteredCountries(
        countries.filter((country) =>
          country.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  }, [inputValue, countries]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    setInputValue(value);
    onChange(value);
    setDropdownOpen(false);
  };

  return (
    <div className={style.autocomplete}>
      <label htmlFor={id} className={style.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={style.input}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
        placeholder="Country"
      />
      {isDropdownOpen && filteredCountries.length > 0 && (
        <ul className={style.dropdown}>
          {filteredCountries.slice(0, 10).map((country) => (
            <li
              key={country}
              onMouseDown={() => handleSelectChange(country)}
              className={style.option}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSelect;
