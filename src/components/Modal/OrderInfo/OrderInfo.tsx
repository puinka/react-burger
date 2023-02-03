import styles from "./orderinfo.module.css";
import { useParams, useRouteMatch } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../../utils/hooks/useDispatch";
import { useSelector } from "../../../utils/hooks/useSelector";
import { CSSProperties, FC, HTMLAttributes, useEffect } from "react";
import { wsUrl, wsUrlAll } from "../../../utils/constants";
import { getCookie } from "../../../utils/cookie";
import { wsInit } from "../../../services/actions/wsActionTypes";
import { TIngredient } from "../../../utils/types";
import { selectIngredients } from "../../../services/selectors/ingredients-selectors";
import { selectOrders } from "../../../services/selectors/ws-selectors";

type TOrderInfoProps = {
  isPage?: boolean;
} & HTMLAttributes<CSSProperties>;

const getCounter = (arr: TIngredient[], item: TIngredient) => {
  let counter = 0;
  arr.forEach((element) => element._id === item._id && counter++);
  return counter > 1 ? counter : null;
};

export const OrderInfo: FC<TOrderInfoProps> = ({ isPage }) => {
  const { id } = useParams<{ id: string }>();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isPage) {
      const token = getCookie("accessToken");
      const url = path === "/feed/:id" ? wsUrlAll : `${wsUrl}?token=${token}`;
      dispatch(wsInit(url));
    }
  }, [dispatch, isPage, path]);

  const allIngredients = useSelector(selectIngredients);
  const orders = useSelector(selectOrders);
  const currentOrder = orders.find((item) => item._id === id);

  const orderIngredients =
    currentOrder &&
    currentOrder.ingredients.reduce((prev: TIngredient[], curr) => {
      const currentIngredient = allIngredients.find(
        (item) => item._id === curr
      );
      return currentIngredient ? [...prev, currentIngredient] : prev;
    }, []);

  const ingredientsSet = [...new Set(orderIngredients)] as TIngredient[];

  const orderStatus = currentOrder
    ? currentOrder.status === "done"
      ? "Выполнен"
      : currentOrder.status === "pending"
      ? "Готовится"
      : "Создан"
    : "";

  const total =
    orderIngredients &&
    orderIngredients.reduce((acc, current) => acc + current.price, 0);

  const pagePadding: CSSProperties = isPage ? { paddingTop: "120px" } : {};

  const textColor: CSSProperties =
    currentOrder?.status === "done" ? { color: "#00cccc" } : {};

  return (
    <>
      {currentOrder && (
        <div className={styles.container} style={pagePadding}>
          <p className={`text text_type_digits-default mb-10 ${styles.number}`}>
            #{currentOrder.number}
          </p>
          <h2 className="text text_type_main-medium mb-3">
            {currentOrder.name}
          </h2>
          <p className="text text_type_main-default mb-15" style={textColor}>
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
                  {orderIngredients && getCounter(orderIngredients, item) && (
                    <p>{getCounter(orderIngredients, item)} x </p>
                  )}
                  <p>{item.price}</p>
                  <CurrencyIcon type={"primary"} />
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
              <CurrencyIcon type={"primary"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
