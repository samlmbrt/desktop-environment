import { useState } from "react";

import { Dock } from "@/components/Dock/Dock";
import { DockIcon } from "@/components/Dock/DockIcon";
import { Separator } from "@/components/Dock/Separator";
import { ThemeSwitcher } from "@/components/Dock/ThemeSwitcher";
import { Calculator } from "@/components/Applications/Calculator/Calculator";
import { TextEditor } from "@/components/Applications/TextEditor/TextEditor";
import { Desktop } from "@/components/Desktop/Desktop";

import { Calculator as CalculatorIcon, Rows4 } from "lucide-react";

export const App = () => {
  const [textEditorWindowState, setTextEditorWindowState] = useState("open");
  const [calculatorWindowState, setCalculatorWindowState] = useState("closed");

  return (
    <Desktop>
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
        initialTop={100}
        initialLeft={50}
        windowState={calculatorWindowState}
        setWindowState={setCalculatorWindowState}
      />
      <Dock>
        <DockIcon
          Icon={CalculatorIcon}
          tooltip="Calculator"
          windowState={calculatorWindowState}
          setWindowState={setCalculatorWindowState}
        />
        <DockIcon
          Icon={Rows4}
          tooltip="Text Editor"
          windowState={textEditorWindowState}
          setWindowState={setTextEditorWindowState}
        />
        <Separator />
        <ThemeSwitcher />
      </Dock>
    </Desktop>
  );
};
