import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import closeIcon from "/public/icons/close.png";
import maximizeIcon from "/public/icons/maximize.png";
import minimizeIcon from "/public/icons/minimize.png";

import styles from "./Window.module.css";

const Window = ({
  title,
  initialWidth,
  initialHeight,
  initialTop,
  initialLeft,
  zIndex,
  windowState,
  setWindowState,
  minimizeCallback,
  maximizeCallback,
  closeCallback,
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

    typeof maximizeCallback === "function" && maximizeCallback();
  };

  const minimize = () => {
    const nextState = windowState === "minimized" ? "user" : "minimized";
    setWindowState(nextState);

    typeof minimizeCallback === "function" && minimizeCallback();
  };

  const close = () => {
    setWindowState("closed");

    typeof closeCallback === "function" && closeCallback();
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
        {isResizable && (
          <Image
            className={`icon ${styles.icon}`}
            src={minimizeIcon}
            alt="Minimize icon"
            width={20}
            height={20}
            onClick={minimize}
          />
        )}
        {isResizable && (
          <Image
            className={`icon ${styles.icon}`}
            src={maximizeIcon}
            alt="Maximize icon"
            width={20}
            height={20}
            onClick={maximize}
          />
        )}
        <Image
          className={`icon ${styles.icon}`}
          src={closeIcon}
          alt="Close icon"
          width={20}
          height={20}
          onClick={close}
        />
      </div>
      <div className={`body ${styles.body}`}>{children}</div>
    </div>
  );
};

export default Window;
export const titleBarHeight = 30;
export const bodyMargin = 3;
export const minWidth = 200;
export const minHeight = titleBarHeight + 3 * bodyMargin;
