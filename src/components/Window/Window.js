import { useRef, useState } from "react";
import styles from "./Window.module.scss";

export default function Window({ width, height, top, left }) {
  const [isDragging, setIsDragging] = useState(false);
  const domElementRef = useRef(null);
  const coordinates = useRef({ xOffset: 0, yOffset: 0 });

  const handleDragStart = (event) => {
    // todo: fix issue where moving the mouse too quicky stops dragging
    setIsDragging(true);
    const domElement = coordinates.current;

    if (event.type === "touchstart") {
      domElement.initialX = event.touches[0].clientX - domElement.xOffset;
      domElement.initialY = event.touches[0].clientY - domElement.yOffset;
    } else {
      domElement.initialX = event.clientX - domElement.xOffset;
      domElement.initialY = event.clientY - domElement.yOffset;
    }
  };

  const handleDragEnd = () => {
    const domElement = coordinates.current;
    domElement.initialX = domElement.currentX;
    domElement.initialY = domElement.currentY;

    setIsDragging(false);
  };

  const handleDragMove = (event) => {
    if (isDragging) {
      event.preventDefault();
      const domElement = coordinates.current;

      if (event.type === "touchmove") {
        domElement.currentX = event.touches[0].clientX - domElement.initialX;
        domElement.currentY = event.touches[0].clientY - domElement.initialY;
      } else {
        domElement.currentX = event.clientX - domElement.initialX;
        domElement.currentY = event.clientY - domElement.initialY;
      }

      domElement.xOffset = domElement.currentX;
      domElement.yOffset = domElement.currentY;

      domElementRef.current.style.transform = `translate3d(${coordinates.current.currentX}px, ${coordinates.current.currentY}px, 0px)`;
    }
  };

  const handleMouseOut = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  return (
    <div
      className={styles.window}
      ref={domElementRef}
      style={{ width, height, top, left }}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onTouchMove={handleDragMove}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDragMove}
      onMouseOut={handleMouseOut}
    ></div>
  );
}
