import styles from "./DockIcon.module.css";

export const DockIcon = ({ Icon, tooltip, windowState, setWindowState }) => {
  const isOpen = windowState !== "closed";

  return (
    <div
      className={styles.dockIcon}
      onClick={() => {
        setWindowState(windowState === "closed" || windowState === "minimized" ? "user" : "minimized");
      }}
    >
      <div className={styles.toolTip}>{tooltip}</div>
      <div className={styles.iconWrapper}>
        <Icon size={40} strokeWidth={1.5} className={isOpen ? styles.active : undefined} />
      </div>
    </div>
  );
};
