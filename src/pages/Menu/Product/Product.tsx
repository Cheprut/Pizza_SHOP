import { Link } from "react-router-dom";
import type { IProduct } from "../../../interfaces/product.interface";
import styles from "./Product.module.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../../store/cart.slice";

function Product({ item }: { item: IProduct }) {
  const dispatch = useDispatch();
  const addToCard = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(addItem(item.id));
  };
  return (
    <Link to={`/product/${item.id}`} className={styles.link}>
      <div className={styles.card} key={item.id}>
        <img className={styles.image} src={item.image} alt={item.name} />
        <button onClick={addToCard} className={styles.buy}>
          <img src="./public/buy.png" alt="" />
        </button>
        <div className={styles.info}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.price}>{item.price} ₽</div>
          <div className={styles.ingredients}>
            {item.ingredients.join(", ")}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
