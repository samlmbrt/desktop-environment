import { useEffect, useRef } from "react";

import CloseIcon from "../Icons/Close/CloseIcon";
import MaximizeIcon from "../Icons/Maximize/MaximizeIcon";
import MinimizeIcon from "../Icons/Minimize/MinimizeIcon";

import styles from "./Window.module.scss";

export default function Window({ title, width, height, top, left, children, isResizable = true }) {
  const windowRef = useRef(null);

  useEffect(() => {
    windowRef.current.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className={`window ${styles.window}`}
      style={{ width, height, top, left, minWidth, minHeight }}
      ref={windowRef}
      tabIndex={-1}
    >
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
      <div className={`titleBar ${styles.titleBar}`} style={{ height: titleBarHeight }}>
        <div className={styles.title}>{title}</div>
        <MinimizeIcon />
        <MaximizeIcon />
        <CloseIcon />
      </div>
      <div
        className={`body ${styles.body}`}
        style={{
          width: `calc(100% - 2 * ${bodyMargin}px)`,
          height: `calc(100% - ${titleBarHeight}px - 3 * ${bodyMargin}px)`,
          margin: bodyMargin,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const titleBarHeight = 30;
export const bodyMargin = 3;
export const minWidth = 200;
export const minHeight = titleBarHeight + 3 * bodyMargin;
