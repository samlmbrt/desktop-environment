import useThemeToggle from "/src/hooks/useThemeToggle";

import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [isDarkTheme, toggleTheme] = useThemeToggle();

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      <div className={`${styles.switch} ${isDarkTheme && styles.enabled}`} />
    </div>
  );
};

export default ThemeSwitcher;
