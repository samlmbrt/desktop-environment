import { useRef } from "react";
import Image from "next/image";

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

  const desktopRef = useRef(null);
  const dragState = useRef(null);

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

    for (const window of visibleWindows) {
      window.style.zIndex = 0;
    }

    const targetWindow = event.target.parentNode;
    targetWindow.style.zIndex = 1;
    targetWindow.focus({ preventScroll: true });
  };

  const handleMouseMove = (event) => {
    event.preventDefault();

    const state = dragState.current;
    if (!state) return;

    const element = dragState.current.element;
    const window = element.parentNode;
    const [x, y] = getEventPosition(event);

    if (element.classList.contains("titleBar")) {
      moveElement(window, state.left + x - state.x, state.top + y - state.y);
    } else if (element.classList.contains("rightResizer")) {
      resizeElement(window, state.width + x - state.x, 0);
    } else if (element.classList.contains("bottomResizer")) {
      resizeElement(window, 0, state.height + y - state.y);
    } else if (element.classList.contains("bottomRightResizer")) {
      resizeElement(window, state.width + x - state.x, state.height + y - state.y);
    } else if (element.classList.contains("leftResizer")) {
      moveElement(window, state.left + x - state.x, 0);
      resizeElement(window, state.width - x + state.x, 0);
    } else if (element.classList.contains("topResizer")) {
      moveElement(window, 0, state.top + y - state.y);
      resizeElement(window, 0, state.height - y + state.y);
    } else if (element.classList.contains("topLeftResizer")) {
      moveElement(window, state.left + x - state.x, state.top + y - state.y);
      resizeElement(window, state.width - x + state.x, state.height - y + state.y);
    } else if (element.classList.contains("topRightResizer")) {
      moveElement(window, 0, state.top + y - state.y);
      resizeElement(window, state.width + x - state.x, state.height - y + state.y);
    } else if (element.classList.contains("bottomLeftResizer")) {
      moveElement(window, state.left + x - state.x, 0);
      resizeElement(window, state.width - x + state.x, state.height + y - state.y);
    }
  };

  const handleMouseUp = (event) => {
    event.preventDefault();

    if (dragState.current) {
      dragState.current = null;
    }
  };

  return (
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
        <Image src={wallpaper} alt="Background wallpaper" placeholder="blur" layout="fill" objectFit="cover" />
        {children}
      </div>
    </>
  );
}
