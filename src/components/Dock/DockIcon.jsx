import { useState } from "react";

import styles from "./DockIcon.module.css";

const DockIcon = ({ icon, tooltip, windowState, setWindowState }) => {
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
        if (windowState === "closed") {
          setWindowState("user");
        }
      }}
    >
      <div className={`${styles.toolTip} ${isHovered && styles.hovered}`}>{tooltip}</div>
      <div
        className={`${styles.iconWrapper} ${isPressed && styles.pressed}`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {icon}
      </div>
      <div className={styles.dot} style={{ opacity: windowState !== "closed" ? 1 : 0 }} />
    </div>
  );
};

export default DockIcon;
