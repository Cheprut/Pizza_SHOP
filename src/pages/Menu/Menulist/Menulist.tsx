import type { IMenulistProps } from "./Menulist.props";
import styles from "./Menulist.module.css";
import Product from "../Product/Product";

function MenuList({ products }: IMenulistProps) {
  return (
    <div className={styles.wrapper}>
      {products.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  );
}

export default MenuList;
