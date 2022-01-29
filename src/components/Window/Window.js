import { useEffect, useRef, useState } from "react";

import CloseIcon from "/src/components/Icons/Close/CloseIcon";
import MaximizeIcon from "/src/components/Icons/Maximize/MaximizeIcon";
import MinimizeIcon from "/src/components/Icons/Minimize/MinimizeIcon";

import styles from "./Window.module.scss";

const Window = ({ title, width, height, top, left, zIndex, children, isResizable = true }) => {
  const [isVisible, setIsVisible] = useState(true);
  const windowRef = useRef(null);
  useEffect(() => {
    windowRef.current.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className={`window ${styles.window}`}
      style={{ width, height, top, left, minWidth, minHeight, zIndex, visibility: isVisible ? "visible" : "hidden" }}
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
        <CloseIcon
          callback={() => {
            setIsVisible(false);
          }}
        />
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
};

export default Window;
export const titleBarHeight = 30;
export const bodyMargin = 3;
export const minWidth = 200;
export const minHeight = titleBarHeight + 3 * bodyMargin;
