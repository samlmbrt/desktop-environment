import CloseIcon from "../Icons/Close/CloseIcon";
import MaximizeIcon from "../Icons/Maximize/MaximizeIcon";
import MinimizeIcon from "../Icons/Minimize/MinimizeIcon";
import styles from "./Window.module.scss";

export default function Window({ title, width, height, top, left, children }) {
  return (
    <div className={styles.window} style={{ width, height, top, left }}>
      <div className={`topBorder ${styles.topBorder}`}></div>
      <div className={`rightBorder ${styles.rightBorder}`}></div>
      <div className={`bottomBorder ${styles.bottomBorder}`}></div>
      <div className={`leftBorder ${styles.leftBorder}`}></div>
      <div className={`topLeftCorner ${styles.topLeftCorner}`}></div>
      <div className={`topRightCorner ${styles.topRightCorner}`}></div>
      <div className={`bottomLeftCorner ${styles.bottomLeftCorner}`}></div>
      <div className={`bottomRightCorner ${styles.bottomRightCorner}`}></div>
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
