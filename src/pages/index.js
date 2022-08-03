import { useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Dock from "/src/components/Dock/Dock";
import DockIcon from "/src/components/Dock/DockIcon";
import Separator from "/src/components/Dock/Separator";
import ThemeSwitcher from "/src/components/Dock/ThemeSwitcher";
import Calculator from "/src/components/Applications/Calculator/Calculator";
import TextEditor from "/src/components/Applications/TextEditor/TextEditor";

import calculatorIcon from "/public/icons/calculator.png";
import textEditorIcon from "/public/icons/editor.png";

// Disabling server-side rendering so we can retrieve the screen resolution on first render.
const Desktop = dynamic(() => import("/src/components/Desktop/Desktop"), { ssr: false });

const Index = () => {
  const [textEditorWindowState, setTextEditorWindowState] = useState("closed");
  const [calculatorWindowState, setCalculatorWindowState] = useState("closed");

  return (
    <>
      <Head>
        <title>Virtual Desktop</title>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <Desktop>
        <TextEditor
          initialWidth={640}
          initialHeight={480}
          initialTop={10}
          initialLeft={10}
          windowState={textEditorWindowState}
          setWindowState={setTextEditorWindowState}
        />
        <Calculator
          initialWidth={280}
          initialHeight={480}
          initialTop={10}
          initialLeft={800}
          windowState={calculatorWindowState}
          setWindowState={setCalculatorWindowState}
        />
        <Dock>
          <DockIcon
            icon={textEditorIcon}
            alt="Icon for text editor"
            tooltip="Text Editor"
            windowState={textEditorWindowState}
            setWindowState={setTextEditorWindowState}
          />
          <DockIcon
            icon={calculatorIcon}
            alt="Icon for calculator"
            tooltip="Calculator"
            windowState={calculatorWindowState}
            setWindowState={setCalculatorWindowState}
          />
          <Separator />
          <ThemeSwitcher />
        </Dock>
      </Desktop>
    </>
  );
};

export default Index;
