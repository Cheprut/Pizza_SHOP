import { useDispatch } from "react-redux";
import styles from "./Cartitem.module.css";
import type { CartitemProps } from "./Cartitem.props";
import type { AppDispath } from "../../store/store";
import { decrease, increase, removeItem } from "../../store/cart.slice";

function Cartitem({ count, id, image, name, price }: CartitemProps) {
  const dispatch = useDispatch<AppDispath>();
  return (
    <div className={styles["item"]}>
      <div className={styles["item__container"]}>
        <div>
          {" "}
          <img src={image} alt="#" />
        </div>
        <div className={styles["item__description"]}>
          <div className={styles["item__name"]}>{name}</div>
          <div className={styles["item__price"]}>
            {price}
            <span className={styles["item__currency"]}>&nbsp;грн.</span>
          </div>
        </div>
      </div>
      <div className={styles["item__button"]}>
        <button
          className={styles["item__minus"]}
          onClick={() => dispatch(decrease(id))}
        >
          <span>&#8722;</span>
        </button>
        <span className={styles["item__count"]}>{count}</span>
        <button
          className={styles["item__plus"]}
          onClick={() => dispatch(increase(id))}
        >
          <span>&#43;</span>
        </button>
        <button
          className={styles["item__remove"]}
          onClick={() => dispatch(removeItem(id))}
        >
          <img
            className={styles["item__delete"]}
            src="delete.svg"
            alt="Иконка удаления товара"
          />
        </button>
      </div>
    </div>
  );
}

export default Cartitem;
