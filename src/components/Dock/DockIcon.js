import { useState } from "react";
import Image from "next/image";

import styles from "./DockIcon.module.css";

const DockIcon = ({ icon, alt, tooltip, windowState, setWindowState }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handlePointerDown = () => {
    setIsPressed(true);
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  return (
    <div
      className={styles.dockIcon}
      onClick={() => {
        setWindowState(true);
      }}
    >
      <div className={`${styles.toolTip} ${isHovered && styles.hovered}`}>{tooltip}</div>
      <Image
        className={`${isPressed && styles.pressed}`}
        src={icon}
        alt={alt}
        placeholder="blur"
        width={64}
        height={64}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      <div className={styles.dot} style={{ opacity: windowState !== "closed" ? 1 : 0 }} />
    </div>
  );
};

export default DockIcon;
