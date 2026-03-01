import { useState } from "react";
import Window from "@/components/Window/Window";

import styles from "./Calculator.module.css";

const OPERATORS = ["+", "-", "×", "÷"];

const BUTTONS = [
  { label: "AC", position: "ac", variant: "lightGrey" },
  { label: "±", position: "negate", variant: "lightGrey", action: "negate" },
  { label: "%", position: "percent", variant: "lightGrey", action: "percent" },
  { label: "÷", position: "divide", variant: "yellow" },
  { label: "7", position: "seven" },
  { label: "8", position: "eight" },
  { label: "9", position: "nine" },
  { label: "×", position: "times", variant: "yellow" },
  { label: "4", position: "four" },
  { label: "5", position: "five" },
  { label: "6", position: "six" },
  { label: "-", position: "minus", variant: "yellow" },
  { label: "1", position: "one" },
  { label: "2", position: "two" },
  { label: "3", position: "three" },
  { label: "+", position: "plus", variant: "yellow" },
  { label: "0", position: "zero" },
  { label: ".", position: "dot" },
  { label: "=", position: "equal", variant: "yellow", action: "equals" },
];

const cx = (...names) => names.filter(Boolean).join(" ");

function isDigit(ch) {
  return ch >= "0" && ch <= "9";
}

function parseExpr(chars, pos) {
  let [left, i] = parseTerm(chars, pos);
  while (i < chars.length && (chars[i] === "+" || chars[i] === "-")) {
    const op = chars[i];
    const [right, next] = parseTerm(chars, i + 1);
    left = op === "+" ? left + right : left - right;
    i = next;
  }
  return [left, i];
}

function parseTerm(chars, pos) {
  let [left, i] = parseNumber(chars, pos);
  while (i < chars.length && (chars[i] === "×" || chars[i] === "÷")) {
    const op = chars[i];
    const [right, next] = parseNumber(chars, i + 1);
    left = op === "×" ? left * right : left / right;
    i = next;
  }
  return [left, i];
}

function parseNumber(chars, pos) {
  let i = pos;
  let numStr = "";
  if (i < chars.length && chars[i] === "-") {
    numStr += "-";
    i++;
  }
  if (i >= chars.length || (!isDigit(chars[i]) && chars[i] !== ".")) {
    throw new Error("Expected number");
  }
  while (i < chars.length && (isDigit(chars[i]) || chars[i] === ".")) {
    numStr += chars[i];
    i++;
  }
  return [parseFloat(numStr), i];
}

function evaluate(input) {
  if (input.length === 0) return null;
  const chars = [...input];
  while (chars.length > 0 && OPERATORS.includes(chars.at(-1))) {
    chars.pop();
  }
  if (chars.length === 0) return null;
  const [result, consumed] = parseExpr(chars, 0);
  if (consumed !== chars.length) throw new Error("Unexpected characters");
  return result;
}

function formatResult(value) {
  if (value === null || !isFinite(value)) return null;
  return parseFloat(value.toPrecision(12));
}

export default function Calculator(props) {
  const [input, setInput] = useState([]);
  const [hasError, setHasError] = useState(false);

  const handlePress = (value) => {
    if (hasError) return;
    if (input.length === 0 && value === "0") return;
    if (input.length === 0 && (value === "×" || value === "÷")) return;

    if (value === ".") {
      const lastOperatorIndex = input.findLastIndex((ch) => OPERATORS.includes(ch));
      const currentSegment = input.slice(lastOperatorIndex + 1);
      if (currentSegment.includes(".")) return;
    }

    if (OPERATORS.includes(value) && OPERATORS.includes(input.at(-1))) {
      setInput((prev) => [...prev.slice(0, -1), value]);
      return;
    }

    setInput((prev) => [...prev, value]);
  };

  const evaluateWith = (transform) => {
    if (hasError || input.length === 0) return;
    try {
      const raw = evaluate(input);
      if (raw === null) return;
      const result = formatResult(transform(raw));
      if (result === null) {
        setHasError(true);
      } else {
        setInput([String(result)]);
      }
    } catch {
      setHasError(true);
    }
  };

  const handleClick = ({ label, action }) => {
    if (label === "AC") {
      setHasError(false);
      setInput([]);
    } else if (action === "negate") {
      evaluateWith((v) => -v);
    } else if (action === "percent") {
      evaluateWith((v) => v / 100);
    } else if (action === "equals") {
      evaluateWith((v) => v);
    } else {
      handlePress(label);
    }
  };

  const display = hasError ? "Error" : input.length === 0 ? "0" : input.join("");

  return (
    <Window {...props} title="Calculator" isResizable={false}>
      <div className={styles.calculator} tabIndex={-1}>
        <div className={styles.screen}>{display}</div>
        {BUTTONS.map((button) => (
          <div
            key={button.position}
            className={cx(styles.button, styles[button.position], button.variant && styles[button.variant])}
            onClick={() => handleClick(button)}
          >
            {button.label}
          </div>
        ))}
      </div>
    </Window>
  );
}
