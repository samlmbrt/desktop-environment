import Window from "/src/components/Window/Window";

import styles from "./Calculator.module.css";

const Calculator = (props) => {
  return (
    <Window {...props} title="Calculator" isResizable={false}>
      <div className={styles.calculator} tabIndex={-1}>
        <div className={`${styles.screen}`}>123123123123123</div>
        <div className={`${styles.button} ${styles.ac} ${styles.lightGrey}`}>AC</div>
        <div className={`${styles.button} ${styles.negate} ${styles.lightGrey}`}>±</div>
        <div className={`${styles.button} ${styles.percent} ${styles.lightGrey}`}>%</div>
        <div className={`${styles.button} ${styles.divide} ${styles.yellow}`}>÷</div>
        <div className={`${styles.button} ${styles.seven}`}>7</div>
        <div className={`${styles.button} ${styles.eight}`}>8</div>
        <div className={`${styles.button} ${styles.nine}`}>9</div>
        <div className={`${styles.button} ${styles.times} ${styles.yellow}`}>×</div>
        <div className={`${styles.button} ${styles.four}`}>4</div>
        <div className={`${styles.button} ${styles.five}`}>5</div>
        <div className={`${styles.button} ${styles.six}`}>6</div>
        <div className={`${styles.button} ${styles.minus} ${styles.yellow}`}>-</div>
        <div className={`${styles.button} ${styles.one}`}>1</div>
        <div className={`${styles.button} ${styles.two}`}>2</div>
        <div className={`${styles.button} ${styles.three}`}>3</div>
        <div className={`${styles.button} ${styles.plus} ${styles.yellow}`}>+</div>
        <div className={`${styles.button} ${styles.zero}`}>0</div>
        <div className={`${styles.button} ${styles.dot}`}>.</div>
        <div className={`${styles.button} ${styles.equal} ${styles.yellow}`}>=</div>
      </div>
    </Window>
  );
};

export default Calculator;
