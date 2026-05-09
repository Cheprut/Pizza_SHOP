import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PREFIX } from "../../api/api";
import type { IProduct } from "../../interfaces/product.interface";
import { addItem } from "../../store/cart.slice";
import styles from "./Card.module.css";

function Card() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Товар не найден");
      return;
    }

    const getProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
        setProduct(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.message);
          return;
        }

        setError("Произошла ошибка");
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const addProductToCart = () => {
    if (!product) {
      return;
    }

    dispatch(addItem(product.id));
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading || !product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles["product-block"]}>
      <div className={styles["product-top"]}>
        <div className={styles["product-top-first"]}>
          <button
            type="button"
            className={styles["product-prev"]}
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
          <h1>{product.name}</h1>
        </div>

        <button
          type="button"
          className={styles["product-buy"]}
          onClick={addProductToCart}
        >
          <img src="/buy.png" alt="" />
          В корзину
        </button>
      </div>

      <div className={styles["product-bottom"]}>
        <div className={styles["product-bottom__left"]}>
          <img
            className={styles["product-bottom__image"]}
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className={styles["product-bottom__right"]}>
          <div className={styles["product-bottom__right-top"]}>
            <span className={styles["product-price"]}>{product.price} ₽</span>
            <span className={styles["product-rayting"]}>{product.rating}</span>
          </div>

          <div
            className={`${styles["product-bottom__right-top"]} ${styles["product-bottom__right-top-bg"]}`}
          >
            <span>Описание</span>
            <span>{product.description}</span>
          </div>

          <div className={styles["product-bottom__right-bottom"]}>
            <p>Состав:</p>
            <ul className={styles["product-bottom__ingredient"]}>
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
