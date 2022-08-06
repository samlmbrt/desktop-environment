import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Dock from "/src/components/Dock/Dock";
import DockIcon from "/src/components/Dock/DockIcon";
import Separator from "/src/components/Dock/Separator";
import ThemeSwitcher from "/src/components/Dock/ThemeSwitcher";
import Browser from "/src/components/Applications/Browser/Browser";
import Calculator from "/src/components/Applications/Calculator/Calculator";
import TextEditor from "/src/components/Applications/TextEditor/TextEditor";

import browserIcon from "/public/icons/browser.png";
import calculatorIcon from "/public/icons/calculator.png";
import textEditorIcon from "/public/icons/editor.png";

// Disabling server-side rendering so we can retrieve the screen resolution on first render.
const Desktop = dynamic(() => import("/src/components/Desktop/Desktop"), { ssr: false });

const Index = () => {
  const [browserWindowState, setBrowserWindowState] = useState("closed");
  const [textEditorWindowState, setTextEditorWindowState] = useState("closed");
  const [calculatorWindowState, setCalculatorWindowState] = useState("closed");

  return (
    <>
      <Head>
        <title>Virtual Desktop</title>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <Desktop>
        <Browser
          initialWidth={640}
          initialHeight={480}
          initialTop={10}
          initialLeft={10}
          windowState={browserWindowState}
          setWindowState={setBrowserWindowState}
        />
        <TextEditor
          initialWidth={640}
          initialHeight={480}
          initialTop={50}
          initialLeft={50}
          windowState={textEditorWindowState}
          setWindowState={setTextEditorWindowState}
        />
        <Calculator
          initialWidth={280}
          initialHeight={480}
          initialTop={90}
          initialLeft={90}
          windowState={calculatorWindowState}
          setWindowState={setCalculatorWindowState}
        />
        <Dock>
          <DockIcon
            icon={browserIcon}
            alt="Icon for browser"
            tooltip="Browser"
            windowState={browserWindowState}
            setWindowState={setBrowserWindowState}
          />
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
