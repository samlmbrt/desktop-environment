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

  const moveWindow = (event) => {
    if (!dragElement) return;
    const window = dragElement.parentNode;

    if (event.type === "touchmove") {
      window.currentX = event.touches[0].clientX - window.initialX;
      window.currentY = event.touches[0].clientY - window.initialY;
    } else {
      window.currentX = event.clientX - window.initialX;
      window.currentY = event.clientY - window.initialY;
    }

    window.xOffset = window.currentX;
    window.yOffset = window.currentY;
    window.style.transform = `translate3d(${window.currentX}px, ${window.currentY}px, 0px)`;
  };

  const handleDragStart = (event) => {
    const eventTarget = event.target;

    if (eventTarget.classList.contains("titleBar") || eventTarget.classList.contains("topBorder")) {
      const window = eventTarget.parentNode;

      if (event.type === "touchstart") {
        window.initialX = event.touches[0].clientX - (window.xOffset || 0);
        window.initialY = event.touches[0].clientY - (window.yOffset || 0);
      } else {
        window.initialX = event.clientX - (window.xOffset || 0);
        window.initialY = event.clientY - (window.yOffset || 0);
      }
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
      // todosam
    } else if (dragElement.classList.contains("rightBorder")) {
      const offset = event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
      const { x } = window.getBoundingClientRect();

      window.style.width = `${offset - x}px`;
    } else if (dragElement.classList.contains("bottomBorder")) {
      const offset = event.type === "touchstart" ? event.touches[0].clientY : event.clientY;
      const { y } = window.getBoundingClientRect();

      window.style.height = `${offset - y}px`;
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
