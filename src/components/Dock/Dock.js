import styles from "./Dock.module.css";

const Dock = ({ children }) => {
  return <div className={styles.dock}>{children}</div>;
};

export default Dock;
