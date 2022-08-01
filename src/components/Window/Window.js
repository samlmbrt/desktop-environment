import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { dockHeight } from "/src/components/Dock/Dock";

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
  focusCallback,
  children,
  isResizable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const windowRef = useRef(null);

  useEffect(() => {
    typeof focusCallback === "function" && focusCallback();
  }, [focusCallback]);

  // todo:
  // - change inline styles to css
  // - act on states acordingly
  // - create transitions
  // - get all constnts from css

  const maximize = () => {
    const currentState = windowRef.current.dataset.state;
    const nextState = currentState === "maximized" ? "user" : "maximized";
    windowRef.current.dataset.state = nextState;
    setWindowState(nextState);
  };

  const minimize = () => {
    const currentState = windowRef.current.dataset.state;
    const nextState = currentState === "minimized" ? "user" : "minimized";
    windowRef.current.dataset.state = nextState;
    setWindowState(nextState);
  };

  const close = () => {
    windowRef.current.dataset.state = "closed";
    setWindowState("closed");
  };

  return (
    <div
      className={`window ${styles.window} ${isFocused && styles.focused}`}
      style={{
        // width: windowState === "maximized" ? "100%" : width,
        // height: windowState === "maximized" ? `calc(100% - ${dockHeight}px - 3 * ${bodyMargin}px)` : height,
        // top: windowState === "maximized" ? 0 : top,
        // left: windowState === "maximized" ? 0 : left,
        // width: initialWidth,
        // height: initialHeight,
        // top: initialTop,
        // left: initialLeft,
        minWidth,
        minHeight,
        zIndex,
        visibility: windowState !== "closed" ? "visible" : "hidden",
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
      data-state={windowState}
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
        style={{ height: titleBarHeight, pointerEvents: windowState === "maximized" ? "none" : "auto" }}
      >
        <div className={styles.title}>{title}</div>
        <Image
          className={`icon ${styles.icon}`}
          src={minimizeIcon}
          alt="Minimize icon"
          width={20}
          height={20}
          onClick={minimize}
        />
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
