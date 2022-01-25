import { cloneElement, useRef } from "react";
import Image from "next/image";

import { bodyMargin, minWidth, minHeight } from "/src/components/Window/Window";
import BlueScreen from "/src/components/BlueScreen/BlueScreen";
import useViewport from "/src/hooks/useViewport";
import wallpaper from "/public/wallpaper.png";
import styles from "./Desktop.module.scss";

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

  const classes = element.classList;
  return isDragElement(element) || classes.contains("body");
};

const getEventPosition = (event) => {
  return event.type === "touchmove"
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

export default function Deskop({ children }) {
  // We manage the drag events for Window components here since 'mousemove'
  // events are not triggered for every pixel when moving the mouse around.
  // This means a drag could stop prematurely if the user moves the mouse
  // too fast. By setting the event handlers on the Desktop component, we
  // can be sure not to miss any mouse event.

  const { width, height } = useViewport();
  const desktopRef = useRef(null);
  const dragState = useRef(null);
  let windowCount = useRef(0);

  const handleMouseDown = (event) => {
    event.preventDefault();

    const element = event.target;

    if (isFocusableElement(element)) {
      handleFocusChange(event);
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

  const handleFocusChange = (event) => {
    const visibleWindows = document.getElementsByClassName("window");

    const targetWindow = event.target.parentNode;
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

  const handleMouseMove = (event) => {
    event.preventDefault();

    const state = dragState.current;
    if (!state) return;

    const element = dragState.current.element;
    const window = element.parentNode;
    const [x, y] = getEventPosition(event);

    // These values store (in pixels) how "far" it is possible to move. This
    // is useful to prevent a window from moving when resizing to its minimal
    // size from the left.

    const xRange = state.width - x + state.x - minWidth;
    const yRange = state.height - y + state.y - minHeight;

    if (element.classList.contains("titleBar")) {
      moveElement(window, state.left + x - state.x, state.top + y - state.y);
    } else if (element.classList.contains("rightResizer")) {
      resizeElement(window, state.width + x - state.x, 0);
    } else if (element.classList.contains("bottomResizer")) {
      resizeElement(window, 0, state.height + y - state.y);
    } else if (element.classList.contains("bottomRightResizer")) {
      resizeElement(window, state.width + x - state.x, state.height + y - state.y);
    } else if (element.classList.contains("topRightResizer")) {
      moveElement(window, 0, state.top + y - state.y);
      resizeElement(window, state.width + x - state.x, state.height - y + state.y);
    } else if (element.classList.contains("leftResizer")) {
      moveElement(window, Math.min(state.left + x - state.x, state.left + state.width - minWidth), 0);
      resizeElement(window, Math.max(state.width - x + state.x, minWidth), 0);
    } else if (element.classList.contains("topResizer")) {
      moveElement(window, 0, Math.min(state.top + y - state.y, state.top + state.height - minHeight - bodyMargin - 1));
      resizeElement(window, 0, Math.max(state.height - y + state.y, minHeight));
    } else if (element.classList.contains("bottomLeftResizer")) {
      // todosam: refactor this!
      if (xRange >= 0) {
        moveElement(window, state.left + x - state.x, 0);
      }
      resizeElement(window, state.width - x + state.x, state.height + y - state.y);
    } else if (element.classList.contains("topLeftResizer")) {
      // todosam: refactor this!
      if (xRange >= 0) {
        moveElement(window, state.left + x - state.x, 0);
        resizeElement(window, state.width - x + state.x, 0);
      }
      if (yRange >= 0) {
        moveElement(window, 0, state.top + y - state.y);
        resizeElement(window, 0, state.height - y + state.y);
      }
    }
  };

  const handleMouseUp = (event) => {
    event.preventDefault();

    if (dragState.current) {
      dragState.current = null;
    }
  };

  return width >= requiredViewportWidth && height >= requiredViewportHeight ? (
    <>
      <div
        className={styles.desktop}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={desktopRef}
        tabIndex={-1}
      >
        <Image src={wallpaper} alt="" placeholder="blur" layout="fill" objectFit="cover" />
        {children.map((child) => cloneElement(child, { key: windowCount.current, zIndex: windowCount.current++ }))}
      </div>
    </>
  ) : (
    <BlueScreen
      errorCode={"0x1A (INVALID_SCREEN_SIZE)"}
      cause={`The system requires a screen resolution of at least ${requiredViewportWidth}x${requiredViewportHeight}. Current resolution is ${width}x${height}.`}
    />
  );
}

export const requiredViewportWidth = 800;
export const requiredViewportHeight = 600;
