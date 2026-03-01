import styles from "./DockIcon.module.css";

export const DockIcon = ({ Icon, tooltip, windowState, setWindowState }) => {
  const isOpen = windowState !== "closed";

  return (
    <div
      className={styles.dockIcon}
      onClick={() => {
        if (windowState === "closed") {
          setWindowState("user");
        } else if (windowState === "minimized") {
          setWindowState("user");
        } else {
          setWindowState("minimized");
        }
      }}
    >
      <div className={styles.toolTip}>{tooltip}</div>
      <div className={styles.iconWrapper}>
        <Icon size={40} strokeWidth={1.5} className={isOpen ? styles.active : undefined} />
      </div>
    </div>
  );
};
