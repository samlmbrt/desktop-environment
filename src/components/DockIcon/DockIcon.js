import { useState } from "react";
import Image from "next/image";

import styles from "./DockIcon.module.scss";

const DockIcon = ({ icon, alt, tooltip }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={styles.dockIcon}>
      <div className={`${styles.toolTip} ${isHovered && styles.hovered}`}>{tooltip}</div>
      <Image
        src={icon}
        alt={alt}
        placeholder="blur"
        width={64}
        height={64}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      />
      <div className={styles.dot} />
    </div>
  );
};

export default DockIcon;
