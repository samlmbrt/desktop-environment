import styles from "./BlueScreen.module.css";

const BlueScreen = ({ errorCode = "Unknown", cause = "Unknown" }) => {
  return (
    <div className={styles.blueScreen}>
      <div className={styles.title}>SYSTEM FAILURE</div>
      <div>
        A problem has been detected and the operating system has been shut down to prevent damage to your computer.
      </div>
      <div>
        <div>Error code:</div>
        <div>{errorCode}</div>
      </div>
      <div>
        <div>Cause:</div>
        <div>{cause}</div>
      </div>
      <div>
        <div>Technical information:</div>
        <div>*** STOP: @x000000ED (®x80F128D0, @xc000009€, 0x00060000, @x00000000)</div>
      </div>
    </div>
  );
};

export default BlueScreen;
