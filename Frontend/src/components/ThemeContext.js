import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [flag, setFlag] = useState(false);

  const toggleTheme = () => setFlag((prevFlag) => !prevFlag);

  const value = {
    flag,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const UseThemeContext = () => {
  return useContext(ThemeContext);
};
