import { useNavigate } from "react-router-dom";
import styles from "./Order.module.css";
import Heading from "../../components/Search/Headling/Heading";

function Order() {
  const navigate = useNavigate();
  return (
    <div className={styles["success"]}>
      <img src="./pizza.png" alt="Изображение пиццы" />
      <Heading className={styles["success__title"]}>
        Ваш заказ успешно <br /> оформлен!
      </Heading>

      <button onClick={() => navigate("/")}>Сделать новый</button>
    </div>
  );
}

export default Order;
