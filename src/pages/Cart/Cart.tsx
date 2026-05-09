import { use, useEffect, useState } from "react";
import Heading from "../../components/Search/Headling/Heading";
import type { IProduct } from "../../interfaces/product.interface";
import styles from "./Cart.module.css";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../../store/store";
import axios from "axios";
import { PREFIX } from "../../api/api";
import Cartitem from "../../components/Cartitem/Cartitem";
import Checkout from "../Checkout/Checkout";
import { useNavigate } from "react-router-dom";
import { clean } from "../../store/cart.slice";

const delivery = 100;
function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const jwt = useSelector((store: RootState) => store.user.jwt);
  const items = useSelector((store: RootState) => store.cart.items);
  console.log(items);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );
    navigate("/order");
    dispatch(clean());
  };

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      //console.log(product);
      //console.log(i);
      if (!product) {
        // если продуктов в корзине нет, то возвращаем 0
        return 0;
      }
      return i.count * product.price;
    })
    // console.log(total); // [3600, 1400, 1280]
    // так как map вернул массив "300" "280" "320" - нам нужно пройтись по ниму, используя reduce
    .reduce((acc, i) => (acc += i), 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);

    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id))); // передаем массив промисов, res будет содержать массив продуктов
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <div className={styles.item__wrapper}>
      <Heading className={styles["cart__title"]}> Cart </Heading>
      <div className={styles["item__element"]}>
        {items.map((item) => {
          const product = cartProducts.find((p) => p.id === item.id);

          if (!product) {
            return null;
          }
          return <Cartitem key={product.id} {...product} count={item.count} />;
        })}
      </div>
      <div className={styles["item__table"]}>
        <div className={styles["item__table-el"]}>
          <span className={styles["item__table-info"]}>Итог</span>
          <span className={styles["item__table-price"]}> {total} грн</span>
        </div>

        <div className={styles["item__table-el"]}>
          <span className={styles["item__table-info"]}>Доставка</span>
          <span className={styles["item__table-price"]}>{delivery} грн</span>
        </div>

        <div className={styles["item__table-el"]}>
          <span className={styles["item__table-info"]}>
            Итог ({items.length}) с доставкой
          </span>
          <span className={styles["item__table-price"]}>
            {total + delivery} грн
          </span>
        </div>
        <div className={styles["item__btn"]}>
          <button onClick={checkout}>Оформить</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
