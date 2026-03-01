import { useCallback, useRef } from "react";
import { Window } from "@/components/Window/Window";

import styles from "./TextEditor.module.css";

const DEFAULT_CONTENT = `This is a simple desktop environment I built for fun using JavaScript,
React, and vanilla CSS.

You can move, resize, and focus windows, and toggle between the
light and dark themes.

Attributions:
- Icons by Lucide (lucide.dev)
- Desktop wallpaper by Simon Berger

P.S. The calculator here is just for show — don't trust it with anything important!`;

export const TextEditor = (props) => {
  const textAreaRef = useRef(null);

  const focusTextArea = useCallback(() => {
    textAreaRef.current?.focus();
  }, []);

  return (
    <Window {...props} title="Text Editor" focusCallback={focusTextArea}>
      <div className={styles.textArea} contentEditable suppressContentEditableWarning ref={textAreaRef} tabIndex={-1}>
        {DEFAULT_CONTENT}
      </div>
    </Window>
  );
};
