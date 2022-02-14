import Head from "next/head";
import dynamic from "next/dynamic";

import Dock from "/src/components/Dock/Dock";
import DockIcon from "/src/components/Dock/DockIcon";
import Separator from "/src/components/Dock/Separator";
import ThemeSwitcher from "/src/components/Dock/ThemeSwitcher";
import Calculator from "/src/components/Applications/Calculator/Calculator";
import TextEditor from "/src/components/Applications/TextEditor/TextEditor";

import browserIcon from "/public/icons/browser.png";
import calculatorIcon from "/public/icons/calculator.png";
import textEditorIcon from "/public/icons/editor.png";

// Disabling server-side rendering so we can retrieve the screen resolution on first render.
const Desktop = dynamic(() => import("/src/components/Desktop/Desktop"), { ssr: false });

const Index = () => {
  return (
    <>
      <Head>
        <title>Virtual Desktop</title>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <Desktop>
        <TextEditor width={640} height={480} top={10} left={10} />
        <Calculator width={360} height={600} top={10} left={800} />
        <Dock>
          <DockIcon icon={browserIcon} alt="Icon for browser" tooltip="Browser" />
          <DockIcon icon={calculatorIcon} alt="Icon for calculator" tooltip="Calculator" />
          <DockIcon icon={textEditorIcon} alt="Icon for text editor" tooltip="Text Editor" />
          <Separator />
          <ThemeSwitcher />
        </Dock>
      </Desktop>
    </>
  );
};

export default Index;
