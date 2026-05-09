import styles from "./Input.module.css";
import cn from "classnames";
import type { IInputProps } from "./Input.props";

function Input({ className, isValid, ...props }: IInputProps) {
  return (
    <input
      className={cn(styles["input"], className, {
        [styles["invalid"]]: isValid,
      })}
      {...props}
    />
  );
}

export default Input;
