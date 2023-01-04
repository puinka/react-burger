import styles from "./orderinfo.module.css";
import { useParams, useRouteMatch } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { wsUrl, wsUrlAll } from "../../../utils/constants";
import { getCookie } from "../../../utils/cookie";
import { wsInit } from "../../../services/actions/wsActionTypes";

const getCounter = (arr, item) => {
  let counter = 0;
  arr.forEach((element) => element._id === item._id && counter++);
  return counter > 1 ? counter : null;
};

export const OrderInfo = ({ isPage }) => {
  const { id } = useParams();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPage) {
      const token = getCookie("accessToken");
      const url = path === "/feed/:id" ? wsUrlAll : `${wsUrl}?token=${token}`;
      dispatch(wsInit(url));
    }
  }, [dispatch, isPage, path]);

  const allIngredients = useSelector((store) => store.ingredients.ingredients);
  const { orders } = useSelector((store) => store.ws);
  const currentOrder = orders.find((item) => item._id === id);
  const orderIngredients = currentOrder?.ingredients.map((id) =>
    allIngredients.find((item) => item._id === id)
  );

  const ingredientsSet = [...new Set(orderIngredients)];

  const orderStatus = currentOrder
    ? currentOrder.status === "done"
      ? "Выполнен"
      : currentOrder.status === "pending"
      ? "Готовится"
      : "Создан"
    : "";

  const total = orderIngredients?.reduce(
    (acc, current) => acc + current.price,
    0
  );

  return (
    <>
      {currentOrder && (
        <div
          className={styles.container}
          style={isPage ? { paddingTop: "120px" } : null}
        >
          <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
            #{currentOrder.number}
          </p>
          <h2 className="text text_type_main-medium mb-3">
            {currentOrder.name}
          </h2>
          <p
            className="text text_type_main-default mb-15"
            style={currentOrder.status === "done" ? { color: "#00cccc" } : null}
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
                  {getCounter(orderIngredients, item) && (
                    <p>{getCounter(orderIngredients, item)} x </p>
                  )}
                  <p>{item.price}</p>
                  <CurrencyIcon />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.meta}>
            <FormattedDate
              date={new Date(currentOrder.createdAt)}
              className="text text_type_main-default text_color_inactive"
            />
            <div className={styles.total}>
              <p className="text text_type_digits-default">{total}</p>
              <CurrencyIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
