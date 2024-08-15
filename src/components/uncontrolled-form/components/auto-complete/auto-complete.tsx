import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { fetchCountries } from "../../../../features/countrySlice";
import style from "./auto-complete.module.css";

interface AutocompleteSelectProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
}

const AutocompleteSelect = forwardRef<
  HTMLInputElement,
  AutocompleteSelectProps
>(({ id, label, onChange }, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const status = useSelector((state: RootState) => state.countries.status);

  const [filteredCountries, setFilteredCountries] =
    useState<string[]>(countries);
  const [inputValue, setInputValue] = useState("");
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
        ref={ref}
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
});

export default AutocompleteSelect;
