import dynamic from "next/dynamic";
import Window from "/src/components/Window/Window";

// Disabling server-side rendering so we can retrieve the screen resolution on first render.
const Desktop = dynamic(() => import("/src/components/Desktop/Desktop"), { ssr: false });

export default function Index() {
  return (
    <Desktop>
      <Window title="Window 1" width={640} height={480} top={10} left={10} />
      <Window title="Window 2" width={640} height={480} top={110} left={110} />
      <Window title="Window 3" width={640} height={480} top={210} left={210} />
    </Desktop>
  );
}
