import styles from "./Window.module.scss";

export default function Window({ title, width, height, top, left, children }) {
  return (
    <div className={styles.window} style={{ width, height, top, left }}>
      <div className={`titleBar ${styles.titleBar}`}>{title}</div>
      {children}
    </div>
  );
}
