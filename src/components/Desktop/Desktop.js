import { useRef } from "react";
import Image from "next/image";

import wallpaper from "/public/wallpaper.png";
import styles from "./Desktop.module.scss";

const isMoverElement = (element) => {
  if (!element) return false;

  const classes = element.classList;
  return (
    classes.contains("titleBar") ||
    classes.contains("topResizer") ||
    classes.contains("leftResizer") ||
    classes.contains("topLeftResizer")
  );
};

const isResizerElement = (element) => {
  if (!element) return false;

  const classes = element.classList;
  return (
    classes.contains("topResizer") ||
    classes.contains("rightResizer") ||
    classes.contains("bottomResizer") ||
    classes.contains("leftResizer") ||
    classes.contains("topLeftResizer") ||
    classes.contains("topRightResizer") ||
    classes.contains("bottomLeftResizer") ||
    classes.contains("bottomRightResizer")
  );
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

  const dragState = useRef();

  const handleDragStart = (event) => {
    event.preventDefault();

    const element = event.target;

    if (isMoverElement(element)) {
      const [x, y] = getEventPosition(event);

      const window = element.parentNode;
      const { top, left, width, height } = window.getBoundingClientRect();

      dragState.current = { element, x, y, top, left, width, height };
    }
  };

  const handleDragMove = (event) => {
    event.preventDefault();

    const state = dragState.current;
    if (!state) return;

    const element = dragState.current.element;
    const window = element.parentNode;

    if (element.classList.contains("titleBar")) {
      const [x, y] = getEventPosition(event);
      moveElement(window, state.left + x - state.x, state.top + y - state.y);
    }
  };

  const handleDragEnd = (event) => {
    event.preventDefault();

    if (dragState.current) {
      dragState.current = null;
    }
  };

  return (
    <>
      <div
        className={styles.desktop}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={handleDragMove}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
      >
        <Image src={wallpaper} alt="Background wallpaper" layout="fill" objectFit="cover" />
        {children}
      </div>
    </>
  );
}
