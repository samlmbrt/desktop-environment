import { useRef } from "react";
import styles from "./Desktop.module.scss";

export default function Deskop({ children }) {
  // We manage the drag events for Window components here since 'mousemove'
  // events are not triggered for every pixel when moving the mouse around.
  // This means a drag could stop prematurely if the user moves the mouse
  // too fast. By setting the event handlers on the Desktop component, we
  // can be sure not to miss any mouse event.
  const windowState = useRef({ xOffset: 0, yOffset: 0 });

  const handleDragStart = (event) => {
    const element = event.target;

    if (!element?.classList.contains("titleBar")) {
      return;
    }

    const state = windowState.current;
    state.element = element;

    if (event.type === "touchstart") {
      state.initialX = event.touches[0].clientX - state.xOffset;
      state.initialY = event.touches[0].clientY - state.yOffset;
    } else {
      state.initialX = event.clientX - state.xOffset;
      state.initialY = event.clientY - state.yOffset;
    }
  };

  const handleDragEnd = () => {
    windowState.current.element = null;
  };

  const handleDragMove = (event) => {
    if (windowState.current.element) {
      event.preventDefault();
      const state = windowState.current;

      if (event.type === "touchmove") {
        state.currentX = event.touches[0].clientX - state.initialX;
        state.currentY = event.touches[0].clientY - state.initialY;
      } else {
        state.currentX = event.clientX - state.initialX;
        state.currentY = event.clientY - state.initialY;
      }

      state.xOffset = state.currentX;
      state.yOffset = state.currentY;

      // Using translate3d() to force GPU to draw animation.
      state.element.parentNode.style.transform = `translate3d(${state.currentX}px, ${state.currentY}px, 0px)`;
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
