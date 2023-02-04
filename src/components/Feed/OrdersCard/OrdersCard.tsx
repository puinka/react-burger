import styles from "./orderscard.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../../utils/hooks/useSelector";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { TIngredient, TOrder } from "../../../utils/types";
import { FC, useMemo } from "react";
import { selectIngredients } from "../../../services/selectors/ingredientsSelectors";
import { OrderIngredientImage } from "./OrderIngredientImage/OrderIngredientImage";

type TOrdersCard = {
  order: TOrder;
  isMine?: boolean;
};

export const OrdersCard: FC<TOrdersCard> = ({ order, isMine }) => {
  const { name, number, createdAt, ingredients, _id, status } = order;
  const allIngredients = useSelector(selectIngredients);

  const orderIngredients = ingredients.map((id) =>
    allIngredients.find((item) => item._id === id)
  );

  const totalPrice = useMemo(() => {
    return orderIngredients?.reduce((acc, item) => {
      if (item?.price) acc += item?.price;
      return acc;
    }, 0);
  }, [orderIngredients]);

  const location = useLocation();
  const { url } = useRouteMatch();

  const orderStatus =
    status === "done"
      ? "Выполнен"
      : status === "pending"
      ? "Готовится"
      : "Создан";

  return (
    <Link
      to={{
        pathname: `${url}/${_id}`,
        state: { background: location },
      }}
    >
      <article className={`p-6 ${styles.container}`}>
        <div className={styles.info}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <h4 className="text text_type_main-medium">{name}</h4>
        {isMine ? (
          <p className="text text_type_main-default mb-6">{orderStatus}</p>
        ) : (
          ``
        )}
        <div className={styles.content}>
          <ul className={styles.ingredientslist}>
            {orderIngredients.slice(0, 5).map((item, index) => {
              return (
                <li
                  className={styles.ingredientitem}
                  key={index}
                  style={{ zIndex: `${orderIngredients.length - index}` }}
                >
                  <OrderIngredientImage item={item} />
                </li>
              );
            })}
            {orderIngredients.length > 5 && (
              <li
                className={styles.ingredientitem}
                key={6}
                style={{ zIndex: `${orderIngredients.length - 6}` }}
              >
                <OrderIngredientImage
                  item={orderIngredients[5]}
                  counter={orderIngredients.length - 5}
                />
              </li>
            )}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OrdersCard;
