import Image from "next/image";
import useThemeToggle from "/src/hooks/useThemeToggle";

import moonIcon from "/public/icons/moon.png";
import sunIcon from "/public/icons/sun.png";

import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [isDarkTheme, toggleTheme] = useThemeToggle();

  return (
    <div className={styles.themeSwitcher} onClick={toggleTheme}>
      <Image className={styles.moon} src={moonIcon} alt="Moon icon" width={24} height={24} />
      <Image className={styles.sun} src={sunIcon} alt="Sun icon" width={24} height={24} />
      <div className={`${styles.switch} ${isDarkTheme && styles.enabled}`} />
    </div>
  );
};

export default ThemeSwitcher;
