import dynamic from "next/dynamic";
import Window from "/src/components/Window/Window";

// Disabling server-side rendering so we can retrieve the screen resolution on first render.
const Desktop = dynamic(() => import("/src/components/Desktop/Desktop"), { ssr: false });

const Index = () => {
  return (
    <Desktop>
      <Window title="Text Editor" width={640} height={480} top={10} left={10} />
      <Window title="Browser" width={640} height={480} top={110} left={110} />
      <Window title="Calculator" width={640} height={480} top={210} left={210} />
    </Desktop>
  );
};

export default Index;
