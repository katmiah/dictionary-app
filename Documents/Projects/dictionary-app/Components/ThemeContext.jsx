import React, { createContext, useState, useContext } from "react";
import { Appearance } from "react-native";

const defaultScheme = Appearance.getColorScheme();

const themes = {
  light: {
    background: "#fff",
    text: "#000",
  },
  dark: {
    background: "#121212",
    text: "#78BFDE",
  },
};

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(defaultScheme || "light");

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme: themes[themeName],
    themeName,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
