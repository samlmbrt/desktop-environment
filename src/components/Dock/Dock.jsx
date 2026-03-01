import styles from "./Dock.module.css";

export const dockHeight = 80;

export const Dock = ({ children }) => {
  return (
    <div className={styles.dock} style={{ height: dockHeight }}>
      {children}
    </div>
  );
};
