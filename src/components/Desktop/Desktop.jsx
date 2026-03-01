import { useRef } from "react";

import { bodyMargin, minWidth, minHeight } from "@/components/Window/Window";
import BlueScreen from "@/components/Desktop/BlueScreen";
import useViewport from "@/hooks/useViewport";

import styles from "./Desktop.module.css";

const dragBehavior = {
  titleBar: (w, d) => {
    move(w, d.xMoveDelta, d.yMoveDelta);
  },
  rightResizer: (w, d) => {
    resize(w, d.xResizeDelta);
  },
  bottomResizer: (w, d) => {
    resize(w, null, d.yResizeDelta);
  },
  bottomRightResizer: (w, d) => {
    resize(w, d.xResizeDelta, d.yResizeDelta);
  },
  topRightResizer: (w, d) => {
    move(w, null, d.yMoveDelta);
    resize(w, d.xResizeDelta, d.yResizeOffset);
  },
  leftResizer: (w, d) => {
    move(w, Math.min(d.xMoveDelta, d.xMoveLimit));
    resize(w, Math.max(d.xResizeOffset, minWidth));
  },
  topResizer: (w, d) => {
    move(w, null, Math.min(d.yMoveDelta, d.yMoveLimit));
    resize(w, null, Math.max(d.yResizeOffset, minHeight));
  },
  bottomLeftResizer: (w, d) => {
    move(w, Math.min(d.xMoveDelta, d.xMoveLimit));
    resize(w, Math.max(d.xResizeOffset, minWidth), d.yResizeDelta);
  },
  topLeftResizer: (w, d) => {
    move(w, Math.min(d.xMoveDelta, d.xMoveLimit), Math.min(d.yMoveDelta, d.yMoveLimit));
    resize(w, Math.max(d.xResizeOffset, minWidth), Math.max(d.yResizeOffset, minHeight));
  },
};

const dragTypes = new Set(Object.keys(dragBehavior));

const isDragElement = (element) => {
  if (!element) return false;
  for (const cls of element.classList) {
    if (dragTypes.has(cls)) return true;
  }
  return false;
};

const isFocusableElement = (element) => {
  if (!element) return false;

  return isDragElement(element) || element.closest(".body") || element.closest(".icon");
};

const move = (element, x, y) => {
  if (x != null) element.style.left = `${x}px`;
  if (y != null) element.style.top = `${y}px`;
};

const resize = (element, width, height) => {
  if (width != null) element.style.width = `${width}px`;
  if (height != null) element.style.height = `${height}px`;
};

const Desktop = ({ children }) => {
  // We manage the drag events for Window components here since 'mousemove'
  // events are not triggered for every pixel when moving the mouse around.
  // This means a drag could stop prematurely if the user moves the mouse
  // too fast. By setting the event handlers on the Desktop component, we
  // can be sure not to miss any mouse event.

  const { width, height } = useViewport();
  const desktopRef = useRef(null);
  const dragState = useRef(null);

  const handleFocusChange = (element) => {
    const targetWindow = element.closest(".window");
    const allWindows = [...document.getElementsByClassName("window")];

    const sorted = allWindows
      .filter((w) => w !== targetWindow)
      .sort((a, b) => (Number(a.style.zIndex) || 0) - (Number(b.style.zIndex) || 0));

    sorted.forEach((w, i) => {
      w.style.zIndex = i;
    });
    targetWindow.style.zIndex = sorted.length;
    targetWindow.focus({ preventScroll: true });
  };

  const handlePointerDown = (event) => {
    const element = event.target;

    if (isFocusableElement(element)) {
      handleFocusChange(element);
    } else {
      desktopRef.current.focus({ preventScroll: true });
    }

    if (isDragElement(element)) {
      const window = element.parentNode;
      const { top, left, width, height } = window.getBoundingClientRect();
      const dragType = [...element.classList].find((cls) => dragTypes.has(cls));

      dragState.current = { dragType, window, x: event.clientX, y: event.clientY, top, left, width, height };
    }
  };

  const handlePointerMove = (event) => {
    const state = dragState.current;
    if (!state) return;

    const { clientX: x, clientY: y } = event;

    const deltas = {
      xResizeDelta: state.width + x - state.x,
      yResizeDelta: state.height + y - state.y,
      xResizeOffset: state.width - x + state.x,
      yResizeOffset: state.height - y + state.y,
      xMoveDelta: state.left + x - state.x,
      yMoveDelta: state.top + y - state.y,
      xMoveLimit: state.left + state.width - minWidth,
      yMoveLimit: state.top + state.height - minHeight - bodyMargin - 1,
    };

    dragBehavior[state.dragType](state.window, deltas);
  };

  const handlePointerUp = () => {
    if (dragState.current) {
      dragState.current = null;
    }
  };

  return width >= requiredViewportWidth && height >= requiredViewportHeight ? (
    <>
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
    </>
  ) : (
    <BlueScreen
      errorCode={"0x1A (INVALID_SCREEN_SIZE)"}
      cause={`The system requires a screen resolution of at least ${requiredViewportWidth}x${requiredViewportHeight}. Current resolution is ${width}x${height}.`}
    />
  );
};

export default Desktop;
export const requiredViewportWidth = 800;
export const requiredViewportHeight = 600;
