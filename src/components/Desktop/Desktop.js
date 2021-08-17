import { useState } from "react";
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

const moveElement = (element, x, y) => {
  if (!element) return;

  // Using translate3d() to force GPU rendering
  element.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  element.xOffset = x;
  element.yOffset = y;
};

const resizeElement = (element, xDelta, yDelta) => {
  if (!element) return;

  const { x, y } = element.getBoundingClientRect();
  if (xDelta) element.style.width = `${xDelta - x}px`;
  if (yDelta) element.style.height = `${yDelta - y}px`;
};

export default function Deskop({ children }) {
  // We manage the drag events for Window components here since 'mousemove'
  // events are not triggered for every pixel when moving the mouse around.
  // This means a drag could stop prematurely if the user moves the mouse
  // too fast. By setting the event handlers on the Desktop component, we
  // can be sure not to miss any mouse event.

  const [dragElement, setDragElement] = useState(null);

  const handleDragStart = (event) => {
    const eventTarget = event.target;

    if (isMoverElement(eventTarget)) {
      const window = eventTarget.parentNode;

      if (!window.xOffset) window.xOffset = 0;
      if (!window.yOffset) window.yOffset = 0;

      const { top, left, width, height } = window.getBoundingClientRect();
      window.initialTop = top;
      window.initialLeft = left;
      window.initialWidth = width;
      window.initialHeight = height;

      const [x, y] = getEventPosition(event);
      window.initialX = x - window.xOffset;
      window.initialY = y - window.yOffset;
    }

    setDragElement(eventTarget);
  };

  const handleDragMove = (event) => {
    event.preventDefault();

    if (!dragElement) return;
    const window = dragElement.parentNode;

    if (dragElement.classList.contains("titleBar")) {
      const [x, y] = getEventPosition(event);
      moveElement(window, x - window.initialX, y - window.initialY);
    } else if (dragElement.classList.contains("topResizer")) {
      // todosam: refactor
      // const [_, yOffset] = getEventCoords(event, 0, window.yOffset);
      // window.style.height = `${window.initialHeight - yOffset + window.initialY}px`;
      // const [x, y] = getEventCoords(event, window.initialX, window.initialY);
    } else if (dragElement.classList.contains("rightResizer")) {
      const [x, _] = getEventPosition(event);
      resizeElement(window, x, 0);
    } else if (dragElement.classList.contains("bottomResizer")) {
      const [_, y] = getEventPosition(event);
      resizeElement(window, 0, y);
    }
  };

  const handleDragEnd = () => {
    if (!dragElement) return;

    if (dragElement.classList.contains("titleBar") || dragElement.classList.contains("topResizer")) {
      const window = dragElement.parentNode;
      window.initialX = window.currentX;
      window.initialY = window.currentY;
    }

    setDragElement(null);
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
