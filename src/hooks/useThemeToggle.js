import { useCallback, useLayoutEffect, useState } from "react";

const useThemeToggle = () => {
  const darkModeMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDarkTheme, setIsDarkTheme] = useState(() => darkModeMatchMedia.matches);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme, setIsDarkTheme]);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");

    darkModeMatchMedia.addEventListener("change", () => {
      toggleTheme();
    });

    return () => darkModeMatchMedia.removeEventListener("change", toggleTheme);
  }, [darkModeMatchMedia, isDarkTheme, toggleTheme]);

  return [isDarkTheme, toggleTheme];
};

export default useThemeToggle;
