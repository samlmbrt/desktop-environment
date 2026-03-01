import { useRef } from "react";
import { Window } from "@/components/Window/Window";

import styles from "./TextEditor.module.css";

export const TextEditor = (props) => {
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
        {"This is a simple desktop environment I built for fun using JavaScript,\n"}
        {"React, and vanilla CSS.\n"}
        {"\n"}
        {"You can move, resize, and focus windows, and toggle between the\n"}
        {"light and dark themes.\n"}
        {"\n"}
        {"Attributions:\n"}
        {"- Icons by Lucide (lucide.dev)\n"}
        {"- Desktop wallpaper by Simon Berger\n"}
        {"\n"}
        {"P.S. The calculator here is just for show — don't trust it with anything important!"}
      </div>
    </Window>
  );
};
