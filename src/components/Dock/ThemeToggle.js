import { useEffect, useState } from "react";
import Image from "next/image";

import useToggle from "/src/hooks/useToggle";

import darkIcon from "/public/icons/dark.png";
import lightIcon from "/public/icons/light.png";

import styles from "./ThemeToggle.module.scss";

const ThemeToggle = () => {
  const [isDarkTheme, toggleDarkTheme] = useToggle(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handlePointerDown = () => {
    toggleDarkTheme();
  };

  return (
    <div className={styles.themeToggle}>
      <div className={`${styles.toolTip} ${isHovered && styles.hovered}`}>Toggle between light and dark theme</div>
      <div onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onPointerDown={handlePointerDown}>
        {isDarkTheme ? (
          <Image src={darkIcon} alt="Icon of the moon" width={64} height={64} />
        ) : (
          <Image src={lightIcon} alt="Icon of the sun" width={64} height={64} />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
