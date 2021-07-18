import CloseIcon from "../Icons/Close/CloseIcon";
import MaximizeIcon from "../Icons/Maximize/MaximizeIcon";
import MinimizeIcon from "../Icons/Minimize/MinimizeIcon";
import styles from "./Window.module.scss";

export default function Window({ title, width, height, top, left, children }) {
  return (
    <div className={styles.window} style={{ width, height, top, left }}>
      <div className={styles.topBorder}></div>
      <div className={styles.rightBorder}></div>
      <div className={styles.bottomBorder}></div>
      <div className={styles.leftBorder}></div>
      <div className={styles.topLeftCorner}></div>
      <div className={styles.topRightCorner}></div>
      <div className={styles.bottomLeftCorner}></div>
      <div className={styles.bottomRightCorner}></div>
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
