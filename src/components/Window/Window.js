import { useRef, useState } from "react";
import styles from "./Window.module.scss";

export default function Window({ width, height, top, left }) {
  const [isDragging, setIsDragging] = useState(false);
  const domElement = useRef(null);
  const coordinates = useRef({ xOffset: 0, yOffset: 0 });

  const handleDragStart = (event) => {
    setIsDragging(true);

    if (event.type === "touchstart") {
      coordinates.current.initialX = event.touches[0].clientX - coordinates.current.xOffset;
      coordinates.current.initialY = event.touches[0].clientY - coordinates.current.yOffset;
    } else {
      coordinates.current.initialX = event.clientX - coordinates.current.xOffset;
      coordinates.current.initialY = event.clientY - coordinates.current.yOffset;
    }
  };

  const handleDragEnd = () => {
    coordinates.current.initialX = coordinates.current.currentX;
    coordinates.current.initialY = coordinates.current.currentY;
    setIsDragging(false);
  };
  const handleDragMove = (event) => {
    if (isDragging) {
      event.preventDefault();

      if (event.type === "touchmove") {
        coordinates.current.currentX = event.touches[0].clientX - coordinates.current.initialX;
        coordinates.current.currentY = event.touches[0].clientY - coordinates.current.initialY;
      } else {
        coordinates.current.currentX = event.clientX - coordinates.current.initialX;
        coordinates.current.currentY = event.clientY - coordinates.current.initialY;
      }

      coordinates.current.xOffset = coordinates.current.currentX;
      coordinates.current.yOffset = coordinates.current.currentY;

      domElement.current.style.transform = `translate3d(${coordinates.current.currentX}px, ${coordinates.current.currentY}px, 0)`;
    }
  };

  const moveTo = (x, y) => {
    domElement.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <div
      className={styles.window}
      ref={domElement}
      style={{ width, height, top, left }}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
      onTouchMove={handleDragMove}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDragMove}
    ></div>
  );
}
