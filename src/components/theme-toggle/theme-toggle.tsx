"use client";
import { FC, useContext } from "react";
import styles from "./theme-toggle.module.css";
import { ThemeContext } from "@contexts/themeContext";

const Toggle: FC = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (setDarkTheme) {
      setDarkTheme((prevTheme) => !prevTheme);
    }
  };

  return (
    <div className={styles.toggleWrapper}>
      <input
        className={styles.toggleInput}
        type="checkbox"
        id="toggle"
        role="switch"
        name="dark"
        checked={darkTheme}
        onChange={toggleTheme}
      />
      <label htmlFor="toggle" className={styles.toggleLabel}></label>
    </div>
  );
};

export default Toggle;
