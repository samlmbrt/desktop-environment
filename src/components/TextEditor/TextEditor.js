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
      <div className={styles.textArea} contentEditable="true" ref={textAreaRef} tabIndex={-1} />
    </Window>
  );
};

export default TextEditor;
