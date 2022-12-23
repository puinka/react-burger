import styles from "./orderinfo.module.css";
import { useLocation, useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export const OrderInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const { orders } = useSelector((store) => store.ws);
  const order = orders.find((item) => item._id === id);

  const { number, name, status, createdAt } = order;
  const { ingredients } = location.state;

  console.log(ingredients);

  const orderStatus =
    status === "done"
      ? "Выполнен"
      : status === "pending"
      ? "Готовится"
      : "Создан";

  const total = ingredients.reduce((acc, current) => acc + current.price, 0);

  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
        #{number}
      </p>
      <h2 className="text text_type_main-medium mb-3">{name}</h2>
      <p className="text text_type_main-default mb-15">{orderStatus}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.ingredientsList}>
        {ingredients.map((item, index) => (
          <li className={styles.ingredient} key={index}>
            <div className={styles.ingredientWrap}>
              <img
                className={styles.image}
                src={item.image_mobile}
                alt={item.name}
              />
              <p className="text text_type_main-default">{item.name}</p>
            </div>
            <div className={styles.price}>
              <p className="text text_type_digits-default">{item.price}</p>
              <CurrencyIcon />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.meta}>
        <FormattedDate
          date={new Date(createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={styles.total}>
          <p className="text text_type_digits-default">{total}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};
