import dynamic from "next/dynamic";

import Dock from "/src/components/Dock/Dock";
import DockIcon from "/src/components/Dock/DockIcon";
import Separator from "/src/components/Dock/Separator";
import TextEditor from "/src/components/Applications/TextEditor/TextEditor";
import Window from "/src/components/Window/Window";

import browserIcon from "/public/icons/browser.png";
import calculatorIcon from "/public/icons/calculator.png";
import textEditorIcon from "/public/icons/editor.png";

// Disabling server-side rendering so we can retrieve the screen resolution on first render.
const Desktop = dynamic(() => import("/src/components/Desktop/Desktop"), { ssr: false });

const Index = () => {
  return (
    <Desktop>
      <Window title="Browser" width={640} height={480} top={10} left={10} />
      <Window title="Calculator" width={640} height={480} top={110} left={110} />
      <TextEditor width={640} height={480} top={210} left={210} />
      <Dock>
        <DockIcon icon={browserIcon} alt="Icon for browser" tooltip="Browser" />
        <DockIcon icon={calculatorIcon} alt="Icon for calculator" tooltip="Calculator" />
        <DockIcon icon={textEditorIcon} alt="Icon for text editor" tooltip="Text Editor" />
        <Separator />
      </Dock>
    </Desktop>
  );
};

export default Index;
