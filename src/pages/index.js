import Window from "../components/Window/Window.js";
import styles from "./index.module.scss";

export default function Index() {
  return (
    <div className={styles.container}>
      <Window width={640} height={480} top={10} left={10} />
    </div>
  );
}
