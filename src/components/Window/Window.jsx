import { useEffect, useRef, useState } from "react";

import { Minus, Square, X } from "lucide-react";

import styles from "./Window.module.css";

export const Window = ({
  title,
  initialWidth,
  initialHeight,
  initialTop,
  initialLeft,
  zIndex,
  windowState,
  setWindowState,
  focusCallback,
  children,
  isResizable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const windowRef = useRef(null);

  useEffect(() => {
    typeof focusCallback === "function" && focusCallback();
  }, [focusCallback]);

  const maximize = () => {
    const nextState = windowState === "maximized" ? "user" : "maximized";
    setWindowState(nextState);
  };

  const minimize = () => {
    const nextState = windowState === "minimized" ? "user" : "minimized";
    setWindowState(nextState);
  };

  const close = () => {
    setWindowState("closed");
  };

  const isMinimized = windowState === "minimized";
  const isMaximized = windowState === "maximized";
  const isClosed = windowState === "closed";

  return (
    <div
      className={`window ${styles.window} ${isFocused && styles.focused} ${isMinimized && styles.minimized} ${
        isMaximized && styles.maximized
      } ${isClosed && styles.closed}`}
      style={{
        width: initialWidth,
        height: initialHeight,
        top: initialTop,
        left: initialLeft,
        minWidth,
        minHeight,
        zIndex,
      }}
      ref={windowRef}
      tabIndex={-1}
      onFocus={() => {
        typeof focusCallback === "function" && focusCallback();
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    >
      {isResizable && windowState !== "maximized" && (
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
      <div
        className={`titleBar ${styles.titleBar}`}
        style={{ pointerEvents: windowState === "maximized" ? "none" : "auto" }}
      >
        <div className={styles.title}>{title}</div>
        {isResizable && <Minus className={`icon ${styles.icon}`} size={18} onClick={minimize} />}
        {isResizable && <Square className={`icon ${styles.icon}`} size={14} onClick={maximize} />}
        <X className={`icon ${styles.icon}`} size={18} onClick={close} />
      </div>
      <div className={`body ${styles.body}`}>{children}</div>
    </div>
  );
};
export const titleBarHeight = 30;
export const bodyMargin = 3;
export const minWidth = 200;
export const minHeight = titleBarHeight + 3 * bodyMargin;
