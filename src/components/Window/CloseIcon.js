import styles from "./CloseIcon.module.scss";

const CloseIcon = ({ callback }) => {
  return <div className={styles.closeIcon} onClick={callback}></div>;
};

export default CloseIcon;
