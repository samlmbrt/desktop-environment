import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { dockHeight } from "/src/components/Dock/Dock";

import closeIcon from "/public/icons/close.png";
import maximizeIcon from "/public/icons/maximize.png";
import minimizeIcon from "/public/icons/minimize.png";

import styles from "./Window.module.css";

const Window = ({ title, width, height, top, left, zIndex, focusCallback, children, isResizable = true }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef(null);

  useEffect(() => {
    typeof focusCallback === "function" && focusCallback();
  }, [focusCallback]);

  return (
    <div
      className={`window ${styles.window} ${isFocused && styles.focused}`}
      style={{
        width: isMaximized ? "100%" : width,
        height: isMaximized ? `calc(100% - ${dockHeight}px - 3 * ${bodyMargin}px)` : height,
        top: isMaximized ? 0 : top,
        left: isMaximized ? 0 : left,
        minWidth,
        minHeight,
        zIndex,
        visibility: isVisible ? "visible" : "hidden",
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
      {isResizable && !isMaximized && (
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
        style={{ height: titleBarHeight, pointerEvents: isMaximized ? "none" : "auto" }}
      >
        <div className={styles.title}>{title}</div>
        <Image className={`icon ${styles.icon}`} src={minimizeIcon} alt="Minimize icon" width={20} height={20} />
        {isResizable && (
          <Image
            className={`icon ${styles.icon}`}
            src={maximizeIcon}
            alt="Maximize icon"
            width={20}
            height={20}
            onClick={() => {
              setIsMaximized(!isMaximized);
            }}
          />
        )}
        <Image
          className={`icon ${styles.icon}`}
          src={closeIcon}
          alt="Close icon"
          width={20}
          height={20}
          onClick={() => {
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
