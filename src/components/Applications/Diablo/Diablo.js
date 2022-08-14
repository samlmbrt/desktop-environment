import { useRef } from "react";
import YouTube from "react-youtube";
import Window from "/src/components/Window/Window";

import styles from "./Diablo.module.css";

const Diablo = (props) => {
  const playerRef = useRef(null);

  const focusCallback = () => {
    playerRef.current?.internalPlayer.playVideo();
  };

  const closeCallback = () => {
    playerRef.current?.internalPlayer.stopVideo();
  };

  const opts = {
    width: "640",
    height: "480",
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };
  return (
    <Window
      {...props}
      title="I am sorry!"
      isResizable={false}
      focusCallback={focusCallback}
      closeCallback={closeCallback}
    >
      <YouTube className={styles.player} videoId="o-YBDTqX_ZU" opts={opts} ref={playerRef} />
    </Window>
  );
};

export default Diablo;
