import Desktop from "../components/Desktop/Desktop";
import Window from "../components/Window/Window";

export default function Index() {
  return (
    <Desktop>
      <Window title="Text Editor" width={640} height={480} top={10} left={10} />
      <Window title="Browser" width={640} height={480} top={600} left={600} />
    </Desktop>
  );
}
