import Desktop from "/src/components/Desktop/Desktop";
import Window from "/src/components/Window/Window";
import BlueScreen from "/src/components/BlueScreen/BlueScreen";

export default function Index() {
  const isMobile = false;
  return isMobile ? (
    <BlueScreen message="This application is not yet available for mobile users." />
  ) : (
    <Desktop>
      <Window title="Window 1" width={640} height={480} top={10} left={10} />
      <Window title="Window 2" width={640} height={480} top={110} left={110} />
      <Window title="Window 3" width={640} height={480} top={210} left={210} />
    </Desktop>
  );
}
