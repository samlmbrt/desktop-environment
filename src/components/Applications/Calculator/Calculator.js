import { useState } from "react";
import Window from "/src/components/Window/Window";

import styles from "./Calculator.module.css";

// todo:
// - numbers too large = scientific notation
// - prevent multiple operators

const Calculator = (props) => {
  const [tokens, setTokens] = useState([]);
  const [hasError, setHasError] = useState(false);

  const ArithmeticButton = ({ className, children }) => {
    return (
      <div
        className={className}
        onClick={() => {
          if (tokens.length === 0 && children === "0") return;
          setTokens([...tokens, children]);
        }}
      >
        {children}
      </div>
    );
  };

  const FunctionButton = ({ className, callback, children }) => {
    return (
      <div
        className={className}
        onClick={() => {
          if (typeof callback === "function") {
            try {
              callback();
            } catch (_err) {
              setHasError(true);
            }
          }
        }}
      >
        {children}
      </div>
    );
  };

  const tokensToString = () => {
    return tokens.join("").replaceAll("÷", "/").replaceAll("×", "*");
  };

  return (
    <Window {...props} title="Calculator" isResizable={false}>
      <div className={styles.calculator} tabIndex={-1}>
        <div className={styles.screen}>{hasError ? "Error" : tokens.length === 0 ? 0 : tokens.join("")}</div>
        <FunctionButton
          className={`${styles.button} ${styles.ac} ${styles.lightGrey}`}
          callback={() => {
            setHasError(false);
            setTokens([]);
          }}
        >
          AC
        </FunctionButton>
        <FunctionButton
          className={`${styles.button} ${styles.negate} ${styles.lightGrey}`}
          callback={() => {
            if (!hasError && tokens.length !== 0) {
              setTokens([-eval(tokensToString())]);
            }
          }}
        >
          ±
        </FunctionButton>
        <FunctionButton
          className={`${styles.button} ${styles.percent} ${styles.lightGrey}`}
          callback={() => {
            if (!hasError && tokens.length !== 0) {
              setTokens([+(eval(tokensToString()) / 100)]);
            }
          }}
        >
          %
        </FunctionButton>
        <ArithmeticButton className={`${styles.button} ${styles.Buttonide} ${styles.yellow}`}>÷</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.seven}`}>7</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.eight}`}>8</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.nine}`}>9</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.times} ${styles.yellow}`}>×</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.four}`}>4</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.five}`}>5</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.six}`}>6</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.minus} ${styles.yellow}`}>-</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.one}`}>1</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.two}`}>2</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.three}`}>3</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.plus} ${styles.yellow}`}>+</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.zero}`}>0</ArithmeticButton>
        <ArithmeticButton className={`${styles.button} ${styles.dot}`}>.</ArithmeticButton>
        <FunctionButton
          className={`${styles.button} ${styles.equal} ${styles.yellow}`}
          callback={() => {
            if (tokens.length !== 0) {
              const result = eval(tokensToString());
              if (isNaN(result)) {
                setHasError(true);
              } else {
                setTokens([result]);
              }
            }
          }}
        >
          =
        </FunctionButton>
      </div>
    </Window>
  );
};

export default Calculator;
