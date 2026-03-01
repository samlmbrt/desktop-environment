import { useRef } from "react";

import { bodyMargin, minWidth, minHeight } from "@/components/Window/Window";
import { BlueScreen } from "@/components/Desktop/BlueScreen";
import { useViewport } from "@/hooks/useViewport";

import styles from "./Desktop.module.css";

export const requiredViewportWidth = 800;
export const requiredViewportHeight = 600;

const dragBehavior = {
  titleBar: (el, metrics) => {
    move(el, metrics.newLeft, metrics.newTop);
  },
  rightResizer: (el, metrics) => {
    resize(el, metrics.newWidth);
  },
  bottomResizer: (el, metrics) => {
    resize(el, null, metrics.newHeight);
  },
  bottomRightResizer: (el, metrics) => {
    resize(el, metrics.newWidth, metrics.newHeight);
  },
  topRightResizer: (el, metrics) => {
    move(el, null, metrics.newTop);
    resize(el, metrics.newWidth, metrics.invertedHeight);
  },
  leftResizer: (el, metrics) => {
    move(el, Math.min(metrics.newLeft, metrics.maxLeft));
    resize(el, Math.max(metrics.invertedWidth, minWidth));
  },
  topResizer: (el, metrics) => {
    move(el, null, Math.min(metrics.newTop, metrics.maxTop));
    resize(el, null, Math.max(metrics.invertedHeight, minHeight));
  },
  bottomLeftResizer: (el, metrics) => {
    move(el, Math.min(metrics.newLeft, metrics.maxLeft));
    resize(el, Math.max(metrics.invertedWidth, minWidth), metrics.newHeight);
  },
  topLeftResizer: (el, metrics) => {
    move(el, Math.min(metrics.newLeft, metrics.maxLeft), Math.min(metrics.newTop, metrics.maxTop));
    resize(el, Math.max(metrics.invertedWidth, minWidth), Math.max(metrics.invertedHeight, minHeight));
  },
};

const dragTypes = new Set(Object.keys(dragBehavior));

const isDragElement = (element) => {
  if (!element) return false;
  return [...element.classList].some((cls) => dragTypes.has(cls));
};

const getDragType = (element) => {
  return [...element.classList].find((cls) => dragTypes.has(cls));
};

const isFocusableElement = (element) => {
  if (!element) return false;

  return isDragElement(element) || element.closest(".body") || element.closest(".icon");
};

const move = (el, left, top) => {
  if (left != null) el.style.left = `${left}px`;
  if (top != null) el.style.top = `${top}px`;
};

const resize = (el, width, height) => {
  if (width != null) el.style.width = `${width}px`;
  if (height != null) el.style.height = `${height}px`;
};

export const Desktop = ({ children }) => {
  // Pointer events are handled here (not on individual windows) because
  // pointermove events can be missed when the cursor moves faster than the
  // element can follow. Listening on the desktop ensures no events are lost.

  const { width, height } = useViewport();
  const desktopRef = useRef(null);
  const dragState = useRef(null);

  const bringToFront = (element) => {
    const targetWindow = element.closest(".window");
    const allWindows = [...document.getElementsByClassName("window")];

    const otherWindows = allWindows
      .filter((w) => w !== targetWindow)
      .sort((a, b) => (Number(a.style.zIndex) || 0) - (Number(b.style.zIndex) || 0));

    otherWindows.forEach((w, i) => {
      w.style.zIndex = i;
    });
    targetWindow.style.zIndex = otherWindows.length;
    targetWindow.focus({ preventScroll: true });
  };

  const handlePointerDown = (event) => {
    const element = event.target;

    if (isFocusableElement(element)) {
      bringToFront(element);
    } else {
      desktopRef.current.focus({ preventScroll: true });
    }

    if (isDragElement(element)) {
      const windowEl = element.parentNode;
      const { top, left, width, height } = windowEl.getBoundingClientRect();

      dragState.current = {
        dragType: getDragType(element),
        windowEl,
        startX: event.clientX,
        startY: event.clientY,
        top,
        left,
        width,
        height,
      };
    }
  };

  const handlePointerMove = (event) => {
    const state = dragState.current;
    if (!state) return;

    const { clientX: x, clientY: y } = event;

    const metrics = {
      newWidth: state.width + x - state.startX,
      newHeight: state.height + y - state.startY,
      invertedWidth: state.width - x + state.startX,
      invertedHeight: state.height - y + state.startY,
      newLeft: state.left + x - state.startX,
      newTop: state.top + y - state.startY,
      maxLeft: state.left + state.width - minWidth,
      maxTop: state.top + state.height - minHeight - bodyMargin - 1,
    };

    dragBehavior[state.dragType](state.windowEl, metrics);
  };

  const handlePointerUp = () => {
    dragState.current = null;
  };

  return width >= requiredViewportWidth && height >= requiredViewportHeight ? (
    <div
      className={styles.desktop}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      ref={desktopRef}
      tabIndex={-1}
    >
      <img className={styles.wallpaper} src="/wallpaper.jpg" alt="" />
      {children}
    </div>
  ) : (
    <BlueScreen
      errorCode={"0x1A (INVALID_SCREEN_SIZE)"}
      cause={`The system requires a screen resolution of at least ${requiredViewportWidth}x${requiredViewportHeight}. Current resolution is ${width}x${height}.`}
    />
  );
};
