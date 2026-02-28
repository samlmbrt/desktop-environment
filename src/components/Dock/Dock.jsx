import styles from "./Dock.module.css";

const Dock = ({ children }) => {
  return (
    <div className={styles.dock} style={{ height: dockHeight }}>
      {children}
    </div>
  );
};

export default Dock;
export const dockHeight = 80;
