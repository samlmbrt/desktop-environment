import Desktop from "/src/components/Desktop/Desktop";
import Window from "/src/components/Window/Window";
import BlueScreen from "/src/components/BlueScreen/BlueScreen";
import useViewport from "/src/hooks/useViewport";

export default function Index() {
  const { width, height } = useViewport();

  console.log(width, height);
  const isMobile = true;
  return isMobile ? (
    <BlueScreen
      errorCode="0x1A (INVALID_SCREEN_SIZE)"
      cause="The system requires a screen resolution of at least 800x600. Current resolution is 640x480."
    />
  ) : (
    <Desktop>
      <Window title="Window 1" width={640} height={480} top={10} left={10} />
      <Window title="Window 2" width={640} height={480} top={110} left={110} />
      <Window title="Window 3" width={640} height={480} top={210} left={210} />
    </Desktop>
  );
}
