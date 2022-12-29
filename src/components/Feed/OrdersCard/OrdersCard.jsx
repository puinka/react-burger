import styles from "./orderscard.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";

export const OrdersCard = ({ order, isMine }) => {
  const { name, number, createdAt, ingredients, _id, status } = order;
  const allIngredients = useSelector((store) => store.ingredients.ingredients);

  const orderIngredients = ingredients.map((id) =>
    allIngredients.find((item) => item._id === id)
  );

  const totalPrice = orderIngredients.reduce(
    (acc, item) => acc + item?.price,
    0
  );

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
        state: { background: location, ingredients: orderIngredients },
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
                  <img
                    className={styles.ingredientimg}
                    src={item.image_mobile}
                    alt={item.name}
                  ></img>
                </li>
              );
            })}
            {orderIngredients.length > 5 && (
              <li
                className={styles.ingredientitem}
                key={6}
                style={{ zIndex: `${orderIngredients.length - 6}` }}
              >
                <div className={styles.hiddencounter}>
                  <p className="text text_type_main-default">{`+${
                    orderIngredients.length - 5
                  }`}</p>
                </div>
                <img
                  className={styles.ingredientimg}
                  src={orderIngredients[5].image_mobile}
                  alt={orderIngredients[5].name}
                ></img>
              </li>
            )}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OrdersCard;
