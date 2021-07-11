import styles from "./Window.module.scss";

export default function Window({ width, height, top, left }) {
  return (
    <div className={styles.window} style={{ width, height, top, left }}></div>
  );
}
