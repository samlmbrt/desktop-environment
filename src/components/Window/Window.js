import CloseIcon from "../Icons/Close/CloseIcon";
import MaximizeIcon from "../Icons/Maximize/MaximizeIcon";
import MinimizeIcon from "../Icons/Minimize/MinimizeIcon";
import styles from "./Window.module.scss";

export default function Window({ title, width, height, top, left, children, isResizable = true }) {
  return (
    <div className={`window ${styles.window}`} style={{ width, height, top, left }}>
      {isResizable && (
        <>
          <div className={`topResizer ${styles.topResizer}`}></div>
          <div className={`rightResizer ${styles.rightResizer}`}></div>
          <div className={`bottomResizer ${styles.bottomResizer}`}></div>
          <div className={`leftResizer ${styles.leftResizer}`}></div>
          <div className={`topLeftResizer ${styles.topLeftResizer}`}></div>
          <div className={`topRightResizer ${styles.topRightResizer}`}></div>
          <div className={`bottomLeftResizer ${styles.bottomLeftResizer}`}></div>
          <div className={`bottomRightResizer ${styles.bottomRightResizer}`}></div>
        </>
      )}
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
