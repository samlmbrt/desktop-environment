import { useCallback, useEffect, useLayoutEffect, useState } from "react";

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

export default function useThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => mediaQuery.matches);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  useEffect(() => {
    const handleChange = (event) => setIsDarkTheme(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  return [isDarkTheme, toggleTheme];
}
