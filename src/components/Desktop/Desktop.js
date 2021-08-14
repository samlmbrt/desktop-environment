import { useState } from "react";
import Image from "next/image";

import wallpaper from "/public/wallpaper.png";
import styles from "./Desktop.module.scss";

export default function Deskop({ children }) {
  // We manage the drag events for Window components here since 'mousemove'
  // events are not triggered for every pixel when moving the mouse around.
  // This means a drag could stop prematurely if the user moves the mouse
  // too fast. By setting the event handlers on the Desktop component, we
  // can be sure not to miss any mouse event.

  const [dragElement, setDragElement] = useState(null);

  const getEventCoords = (event, xDelta = 0, yDelta = 0) => {
    return event.type === "touchmove"
      ? [event.touches[0].clientX - xDelta, event.touches[0].clientY - yDelta]
      : [event.clientX - xDelta, event.clientY - yDelta];
  };

  const moveWindow = (event) => {
    if (!dragElement) return;
    const window = dragElement.parentNode;

    [window.currentX, window.currentY] = getEventCoords(event, window.initialX, window.initialY);
    window.xOffset = window.currentX;
    window.yOffset = window.currentY;

    window.style.transform = `translate3d(${window.currentX}px, ${window.currentY}px, 0px)`;
  };

  const handleDragStart = (event) => {
    const eventTarget = event.target;

    if (eventTarget.classList.contains("titleBar") || eventTarget.classList.contains("topBorder")) {
      const window = eventTarget.parentNode;

      if (!window.xOffset) window.xOffset = 0;
      if (!window.yOffset) window.yOffset = 0;

      const { top, left, width, height } = window.getBoundingClientRect();
      window.initialTop = top;
      window.initialLeft = left;
      window.initialWidth = width;
      window.initialHeight = height;

      [window.initialX, window.initialY] = getEventCoords(event, window.xOffset, window.yOffset);
    }

    setDragElement(eventTarget);
  };

  const handleDragMove = (event) => {
    event.preventDefault();

    if (!dragElement) return;
    const window = dragElement.parentNode;

    if (dragElement.classList.contains("titleBar")) {
      moveWindow(event);
    } else if (dragElement.classList.contains("topBorder")) {
      const [_, yOffset] = getEventCoords(event, 0, window.yOffset);
      window.style.height = `${window.initialHeight - yOffset + window.initialY}px`;
    } else if (dragElement.classList.contains("rightBorder")) {
      const [xOffset, _] = getEventCoords(event, window.xOffset, 0);
      const { x } = window.getBoundingClientRect();
      window.style.width = `${xOffset - x}px`;
    } else if (dragElement.classList.contains("bottomBorder")) {
      const [_, yOffset] = getEventCoords(event, 0, window.yOffset);
      const { y } = window.getBoundingClientRect();
      window.style.height = `${yOffset - y}px`;
    }
  };

  const handleDragEnd = () => {
    if (!dragElement) return;

    if (dragElement.classList.contains("titleBar") || dragElement.classList.contains("topBorder")) {
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
