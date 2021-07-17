import { useState, useRef } from "react";
import styles from "./Desktop.module.scss";

export default function Deskop({ children }) {
  // We manage the drag events for Window components here since 'mousemove'
  // events are not triggered for every pixel when moving the mouse around.
  // This means a drag could stop prematurely if the user moves the mouse
  // too fast. By setting the event handlers on the Desktop component, we
  // can be sure not to miss any mouse event.
  const [isActive, setIsActive] = useState(false);
  const [activeElement, setActiveElement] = useState(null);

  const handleDragStart = (event) => {
    const element = event.target;
    if (!element?.classList.contains("titleBar")) return;
    if (!element.xOffset) element.xOffset = 0;
    if (!element.yOffset) element.yOffset = 0;

    if (event.type === "touchstart") {
      element.initialX = event.touches[0].clientX - element.xOffset;
      element.initialY = event.touches[0].clientY - element.yOffset;
    } else {
      element.initialX = event.clientX - element.xOffset;
      element.initialY = event.clientY - element.yOffset;
    }

    setIsActive(true);
    setActiveElement(element);
  };

  const handleDragEnd = () => {
    if (activeElement) {
      activeElement.initialX = activeElement.currentX;
      activeElement.initialY = activeElement.currentY;
    }

    setIsActive(false);
    setActiveElement(null);
  };

  const handleDragMove = (event) => {
    if (isActive) {
      event.preventDefault();

      if (event.type === "touchmove") {
        activeElement.currentX = event.touches[0].clientX - activeElement.initialX;
        activeElement.currentY = event.touches[0].clientY - activeElement.initialY;
      } else {
        activeElement.currentX = event.clientX - activeElement.initialX;
        activeElement.currentY = event.clientY - activeElement.initialY;
      }

      activeElement.xOffset = activeElement.currentX;
      activeElement.yOffset = activeElement.currentY;

      const windowElement = activeElement.parentNode;
      windowElement.style.transform = `translate3d(${activeElement.currentX}px, ${activeElement.currentY}px, 0px)`;
    }
  };

  return (
    <div
      className={styles.desktop}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onTouchMove={handleDragMove}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDragMove}
    >
      {children}
    </div>
  );
}
