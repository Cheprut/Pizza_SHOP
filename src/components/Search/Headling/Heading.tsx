import type { IHeadlingProps } from "./Heading.props";
import cn from "classnames";
import styles from "./Heading.module.css";

function Heading({ children, className }: IHeadlingProps) {
  return <h1 className={cn([styles["h1"], className])}>{children}</h1>;
}

export default Heading;
