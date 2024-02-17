import React from "react";
import { useSelector } from "react-redux";

//creating a provider to cover the whole app with it when we toggle them
//useselector to have access to the global state and selecting theme

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
        {children}
      </div>
    </div>
  );
}
