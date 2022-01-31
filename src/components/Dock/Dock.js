import styles from "./Dock.module.scss";

const Dock = ({ children }) => {
  return <div className={styles.dock}>{children}</div>;
};

export default Dock;
