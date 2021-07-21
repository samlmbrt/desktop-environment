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
  const [activeElement, setActiveElement] = useState(null);

  const handleDragStart = (event) => {
    const element = event.target;

    if (!element.xOffset) element.xOffset = 0;
    if (!element.yOffset) element.yOffset = 0;

    if (element.classList.contains("titleBar")) {
      if (event.type === "touchstart") {
        element.initialX = event.touches[0].clientX - element.xOffset;
        element.initialY = event.touches[0].clientY - element.yOffset;
      } else {
        element.initialX = event.clientX - element.xOffset;
        element.initialY = event.clientY - element.yOffset;
      }
    }

    setActiveElement(element);
  };

  const handleDragMove = (event) => {
    if (!activeElement) return;

    event.preventDefault();
    const windowElement = activeElement.parentNode;

    if (activeElement.classList.contains("titleBar")) {
      if (event.type === "touchmove") {
        activeElement.currentX = event.touches[0].clientX - activeElement.initialX;
        activeElement.currentY = event.touches[0].clientY - activeElement.initialY;
      } else {
        activeElement.currentX = event.clientX - activeElement.initialX;
        activeElement.currentY = event.clientY - activeElement.initialY;
      }

      activeElement.xOffset = activeElement.currentX;
      activeElement.yOffset = activeElement.currentY;

      windowElement.style.transform = `translate3d(${activeElement.currentX}px, ${activeElement.currentY}px, 0px)`;
    } else if (activeElement.classList.contains("rightBorder")) {
      const offset = event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
      const { x } = windowElement.getBoundingClientRect();

      windowElement.style.width = `${offset - x}px`;
    } else if (activeElement.classList.contains("bottomBorder")) {
      const offset = event.type === "touchstart" ? event.touches[0].clientY : event.clientY;
      const { y } = windowElement.getBoundingClientRect();

      windowElement.style.height = `${offset - y}px`;
    }
  };

  const handleDragEnd = () => {
    if (!activeElement) return;

    if (activeElement.classList.contains("titleBar")) {
      activeElement.initialX = activeElement.currentX;
      activeElement.initialY = activeElement.currentY;
    }

    setActiveElement(null);
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
