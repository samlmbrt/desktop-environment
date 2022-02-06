import { useState } from "react";
import Image from "next/image";

import styles from "./DockIcon.module.css";

const DockIcon = ({ icon, alt, tooltip, callback }) => {
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
    <div className={styles.dockIcon} onClick={callback}>
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
      <div className={styles.dot} />
    </div>
  );
};

export default DockIcon;
