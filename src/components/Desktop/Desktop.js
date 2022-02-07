import { useRef } from "react";
import Image from "next/image";

import { bodyMargin, minWidth, minHeight } from "/src/components/Window/Window";
import BlueScreen from "/src/components/Desktop/BlueScreen";
import useThemeToggle from "/src/hooks/useThemeToggle";
import useViewport from "/src/hooks/useViewport";
import wallpaper from "/public/wallpaper.png";

import styles from "./Desktop.module.css";

const isDragElement = (element) => {
  if (!element) return false;

  const classes = element.classList;
  return (
    classes.contains("titleBar") ||
    classes.contains("topResizer") ||
    classes.contains("leftResizer") ||
    classes.contains("rightResizer") ||
    classes.contains("bottomResizer") ||
    classes.contains("topLeftResizer") ||
    classes.contains("topRightResizer") ||
    classes.contains("bottomLeftResizer") ||
    classes.contains("bottomRightResizer")
  );
};

const isFocusableElement = (element) => {
  if (!element) return false;

  return isDragElement(element) || element.closest(".body") || element.closest(".icon");
};

const getEventPosition = (event) => {
  return event.type.startsWith("touch")
    ? [event.touches[0].clientX, event.touches[0].clientY]
    : [event.clientX, event.clientY];
};

const moveElement = (element, x = 0, y = 0) => {
  if (!element) return;

  if (x) element.style.left = `${x}px`;
  if (y) element.style.top = `${y}px`;
};

const resizeElement = (element, width = 0, height = 0) => {
  if (!element) return;

  if (width) element.style.width = `${width}px`;
  if (height) element.style.height = `${height}px`;
};

const Desktop = ({ children }) => {
  // We manage the drag events ˇˇˇˇˇor Window components here since 'mousemove'
  // events are not triggered for every pixel when moving the mouse around.
  // This means a drag could stop prematurely if the user moves the mouse
  // too fast. By setting the event handlers on the Desktop component, we
  // can be sure not to miss any mouse event.

  const { toggleTheme } = useThemeToggle();
  const { width, height } = useViewport();
  const desktopRef = useRef(null);
  const dragState = useRef(null);

  const handleFocusChange = (element) => {
    // Fixme: use idiomatic React code instead of using the DOM API.
    const visibleWindows = document.getElementsByClassName("window");

    const targetWindow = element.closest(".window");
    const cutoffIndex = targetWindow.style.zIndex;

    for (const window of visibleWindows) {
      const currentIndex = window.style.zIndex;
      if (currentIndex > cutoffIndex) {
        window.style.zIndex = currentIndex - 1;
      }
    }

    targetWindow.style.zIndex = Math.max(visibleWindows.length - 1, 0);
    targetWindow.focus({ preventScroll: true });
  };

  const handlePointerDown = (event) => {
    const element = event.target;

    if (isFocusableElement(element)) {
      handleFocusChange(element);
    } else {
      desktopRef.current.focus({ preventScroll: true });
    }

    if (isDragElement(element)) {
      const [x, y] = getEventPosition(event);

      const window = element.parentNode;
      const { top, left, width, height } = window.getBoundingClientRect();

      dragState.current = { element, x, y, top, left, width, height };
    }
  };

  const handlePointerMove = (event) => {
    const state = dragState.current;
    if (!state) return;

    const element = dragState.current.element;
    const window = element.parentNode;
    const [x, y] = getEventPosition(event);

    // Various calculations for next window position and size.
    const xResizeDelta = state.width + x - state.x;
    const yResizeDelta = state.height + y - state.y;
    const xResizeOffset = state.width - x + state.x;
    const yResizeOffset = state.height - y + state.y;
    const xMoveDelta = state.left + x - state.x;
    const yMoveDelta = state.top + y - state.y;
    const xMoveLimit = state.left + state.width - minWidth;
    const yMoveLimit = state.top + state.height - minHeight - bodyMargin - 1;

    if (element.classList.contains("titleBar")) {
      moveElement(window, xMoveDelta, yMoveDelta);
    } else if (element.classList.contains("rightResizer")) {
      resizeElement(window, xResizeDelta, 0);
    } else if (element.classList.contains("bottomResizer")) {
      resizeElement(window, 0, yResizeDelta);
    } else if (element.classList.contains("bottomRightResizer")) {
      resizeElement(window, xResizeDelta, yResizeDelta);
    } else if (element.classList.contains("topRightResizer")) {
      moveElement(window, 0, yMoveDelta);
      resizeElement(window, xResizeDelta, yResizeOffset);
    } else if (element.classList.contains("leftResizer")) {
      moveElement(window, Math.min(xMoveDelta, xMoveLimit), 0);
      resizeElement(window, Math.max(xResizeOffset, minWidth), 0);
    } else if (element.classList.contains("topResizer")) {
      moveElement(window, 0, Math.min(yMoveDelta, yMoveLimit));
      resizeElement(window, 0, Math.max(yResizeOffset, minHeight));
    } else if (element.classList.contains("bottomLeftResizer")) {
      moveElement(window, Math.min(xMoveDelta, xMoveLimit), 0);
      resizeElement(window, Math.max(xResizeOffset, minWidth), yResizeDelta);
    } else if (element.classList.contains("topLeftResizer")) {
      moveElement(window, Math.min(xMoveDelta, xMoveLimit), Math.min(yMoveDelta, yMoveLimit));
      resizeElement(window, Math.max(xResizeOffset, minWidth), Math.max(yResizeOffset, minHeight));
    }
  };

  const handlePointerUp = () => {
    if (dragState.current) {
      dragState.current = null;
    }
  };

  return width >= requiredViewportWidth && height >= requiredViewportHeight ? (
    <>
      <div
        className={styles.desktop}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
        onTouchMove={handlePointerMove}
        ref={desktopRef}
        tabIndex={-1}
      >
        <Image src={wallpaper} alt="" placeholder="blur" layout="fill" objectFit="cover" />
        {children}
      </div>
    </>
  ) : (
    <BlueScreen
      errorCode={"0x1A (INVALID_SCREEN_SIZE)"}
      cause={`The system requires a screen resolution of at least ${requiredViewportWidth}x${requiredViewportHeight}. Current resolution is ${width}x${height}.`}
    />
  );
};

export default Desktop;
export const requiredViewportWidth = 800;
export const requiredViewportHeight = 600;
