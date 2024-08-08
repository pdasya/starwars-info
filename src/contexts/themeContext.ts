"use client";

import { createContext } from "react";

export interface ThemeContextProps {
  darkTheme: boolean;
  setDarkTheme?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  darkTheme: false,
});
