import styles from "./orderinfo.module.css";
import { useLocation, useParams } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const getCounter = (arr, item) => {
  let counter = 0;
  arr.forEach((element) => element._id === item._id && counter++);
  return counter > 1 ? counter : null;
};

export const OrderInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const { orders } = useSelector((store) => store.ws);
  const order = orders.find((item) => item._id === id);

  const { number, name, status, createdAt } = order;
  const { ingredients } = location.state;

  const orderStatus =
    status === "done"
      ? "Выполнен"
      : status === "pending"
      ? "Готовится"
      : "Создан";

  const total = ingredients.reduce((acc, current) => acc + current.price, 0);

  const ingredientsSet = [...new Set(ingredients)];

  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
        #{number}
      </p>
      <h2 className="text text_type_main-medium mb-3">{name}</h2>
      <p
        className="text text_type_main-default mb-15"
        style={status === "done" ? { color: "#00cccc" } : null}
      >
        {orderStatus}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.ingredientsList}>
        {ingredientsSet.map((item, index) => (
          <li className={styles.ingredient} key={index}>
            <div className={styles.ingredientWrap}>
              <img
                className={styles.image}
                src={item.image_mobile}
                alt={item.name}
              />
              <p className="text text_type_main-default">{item.name}</p>
            </div>
            <div
              className={`className="text text_type_digits-default ${styles.price}`}
            >
              {getCounter(ingredients, item) && (
                <p>{getCounter(ingredients, item)} x </p>
              )}
              <p>{item.price}</p>
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
