import useThemeToggle from "@/hooks/useThemeToggle";

import moonIcon from "@/assets/icons/moon.png";
import sunIcon from "@/assets/icons/sun.png";

import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [isDarkTheme, toggleTheme] = useThemeToggle();

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      <img className={styles.moon} src={moonIcon} alt="Moon icon" width={14} height={14} />
      <img className={styles.sun} src={sunIcon} alt="Sun icon" width={14} height={14} />
      <div className={`${styles.switch} ${isDarkTheme && styles.enabled}`} />
    </div>
  );
};

export default ThemeSwitcher;
