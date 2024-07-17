import { createContext } from "react";

interface ThemeContextProps {
  darkTheme: boolean;
  setDarkTheme?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  darkTheme: false,
  //   setDarkTheme: () => {},
});
