import { useRef } from "react";
import Window from "@/components/Window/Window";

import styles from "./TextEditor.module.css";

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
      <div
        className={styles.textArea}
        contentEditable="true"
        suppressContentEditableWarning={true}
        ref={textAreaRef}
        tabIndex={-1}
      >
        {"This is a simple desktop environment I created for fun using JavaScript,\n"}
        {"React and vanilla CSS.\n"}
        {"\n"}
        {"You can move, resize, focus windows, and you can also toggle between the\n"}
        {"light and the dark theme.\n"}
        {"\n"}
        {"Attributions:\n"}
        {"- Icons by Lucide (lucide.dev)\n"}
        {"- Desktop wallpaper was made by Simon Berger\n"}
        {"\n"}
        {"P.S. Please do not use the provided calculator for important calculations!"}
      </div>
    </Window>
  );
};

export default TextEditor;
