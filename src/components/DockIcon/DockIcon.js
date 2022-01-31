import Image from "next/image";

import styles from "./DockIcon.module.scss";

const DockIcon = ({ icon, alt }) => {
  return (
    <div className={styles.dockIcon}>
      <Image src={icon} alt={alt} placeholder="blur" width={64} height={64} />
      <div className={styles.dot} />
    </div>
  );
};

export default DockIcon;
