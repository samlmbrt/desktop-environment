import CloseIcon from "../Icons/CloseIcon";
import styles from "./Window.module.scss";

export default function Window({ title, width, height, top, left, children }) {
  return (
    <div className={styles.window} style={{ width, height, top, left }}>
      <div className={`titleBar ${styles.titleBar}`}>
        <div className={styles.title}>{title}</div>
        <CloseIcon />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
