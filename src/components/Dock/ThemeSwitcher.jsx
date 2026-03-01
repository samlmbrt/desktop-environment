import { Sun, Moon } from "lucide-react";
import useThemeToggle from "@/hooks/useThemeToggle";

import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [isDarkTheme, toggleTheme] = useThemeToggle();

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      {isDarkTheme ? <Sun size={28} /> : <Moon size={28} />}
    </div>
  );
};

export default ThemeSwitcher;
