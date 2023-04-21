import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();
export const useDarkModeContext = () => useContext(DarkModeContext);

export const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || false
  );

  const toggle = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
