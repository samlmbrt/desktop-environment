import { useEffect, useRef } from "react";
import Window from "/src/components/Window/Window";

import styles from "./TextEditor.module.scss";

const TextEditor = (props) => {
  const textAreaRef = useRef(null);

  return (
    <Window
      {...props}
      title="Text Editor"
      focusCallback={() => {
        textAreaRef.current.focus();
      }}
    >
      <textarea className={styles.textArea} wrap="off" ref={textAreaRef}></textarea>
    </Window>
  );
};

export default TextEditor;
