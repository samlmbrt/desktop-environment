import Desktop from "../components/Desktop/Desktop";
import Window from "../components/Window/Window";

export default function Index() {
  return (
    <Desktop>
      <Window title="Window 1" width={640} height={480} top={10} left={10} />
      <Window title="Window 2" width={640} height={480} top={110} left={110} />
      <Window title="Window 3" width={640} height={480} top={210} left={210} />
    </Desktop>
  );
}
