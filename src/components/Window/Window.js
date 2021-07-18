import CloseIcon from "../Icons/Close/CloseIcon";
import MaximizeIcon from "../Icons/Maximize/MaximizeIcon";
import MinimizeIcon from "../Icons/Minimize/MinimizeIcon";
import styles from "./Window.module.scss";

export default function Window({ title, width, height, top, left, children }) {
  return (
    <div className={styles.window} style={{ width, height, top, left }}>
      <div className={`titleBar ${styles.titleBar}`}>
        <div className={styles.title}>{title}</div>
        <MinimizeIcon />
        <MaximizeIcon />
        <CloseIcon />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
