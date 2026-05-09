import type { ISearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";

function Search({ className, isValid, ...props }: ISearchProps) {
  return (
    <div className={styles["input-wrapper"]}>
      <img className={styles["icon"]} src="./Search.png" alt="Search" />
      <input
        className={cn(styles["input"], className, {
          [styles["invalid"]]: isValid,
        })}
        {...props}
      />
    </div>
  );
}

export default Search;
