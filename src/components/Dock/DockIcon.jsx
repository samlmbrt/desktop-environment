import { useState } from "react";

import styles from "./DockIcon.module.css";

const DockIcon = ({ Icon, tooltip, windowState, setWindowState }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isOpen = windowState !== "closed";

  return (
    <div
      className={styles.dockIcon}
      onClick={() => {
        if (windowState === "closed") {
          setWindowState("user");
        }
      }}
    >
      <div className={`${styles.toolTip} ${isHovered && styles.hovered}`}>{tooltip}</div>
      <div
        className={`${styles.iconWrapper} ${isPressed && styles.pressed}`}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
      >
        <Icon size={40} strokeWidth={1.5} className={isOpen ? styles.active : undefined} />
      </div>
    </div>
  );
};

export default DockIcon;
