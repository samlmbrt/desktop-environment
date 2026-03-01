import { useState } from "react";

import { Minus, Square, X } from "lucide-react";

import styles from "./Window.module.css";

export const titleBarHeight = 30;
export const bodyMargin = 3;
export const minWidth = 200;
export const minHeight = titleBarHeight + 3 * bodyMargin;

const RESIZERS = [
  "topResizer",
  "rightResizer",
  "bottomResizer",
  "leftResizer",
  "topLeftResizer",
  "topRightResizer",
  "bottomLeftResizer",
  "bottomRightResizer",
];

const cx = (...names) => names.filter(Boolean).join(" ");

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

  const maximize = () => {
    setWindowState(windowState === "maximized" ? "user" : "maximized");
  };

  const minimize = () => {
    setWindowState(windowState === "minimized" ? "user" : "minimized");
  };

  const close = () => {
    setWindowState("closed");
  };

  const isMinimized = windowState === "minimized";
  const isMaximized = windowState === "maximized";
  const isClosed = windowState === "closed";

  return (
    <div
      className={cx(
        "window",
        styles.window,
        isFocused && styles.focused,
        isMinimized && styles.minimized,
        isMaximized && styles.maximized,
        isClosed && styles.closed,
      )}
      style={{
        width: initialWidth,
        height: initialHeight,
        top: initialTop,
        left: initialLeft,
        minWidth,
        minHeight,
        zIndex,
      }}
      tabIndex={-1}
      onFocus={() => {
        focusCallback?.();
        setIsFocused(true);
      }}
      onBlur={() => setIsFocused(false)}
    >
      {isResizable && !isMaximized && (
        <>
          {RESIZERS.map((name) => (
            <div key={name} className={`${name} ${styles[name]}`} />
          ))}
        </>
      )}
      <div className={`titleBar ${styles.titleBar}`} style={{ pointerEvents: isMaximized ? "none" : "auto" }}>
        <div className={styles.title}>{title}</div>
        {isResizable && <Minus className={`icon ${styles.icon}`} size={18} onClick={minimize} />}
        {isResizable && <Square className={`icon ${styles.icon}`} size={14} onClick={maximize} />}
        <X className={`icon ${styles.icon}`} size={18} onClick={close} />
      </div>
      <div className={`body ${styles.body}`}>{children}</div>
    </div>
  );
};
