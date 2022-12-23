import styles from "./orderscard.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export const OrdersCard = ({ order }) => {
  const { name, number, createdAt, ingredients } = order;
  const allIngredients = useSelector((store) => store.ingredients.ingredients);

  const orderIngredients = ingredients.map((id) =>
    allIngredients.find((item) => item._id === id)
  );

  //console.log(orderIngredients);

  const totalPrice = orderIngredients.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <li>
      <article className={`p-6 ${styles.container}`}>
        <div className={styles.info}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <h4 className="text text_type_main-medium">{name}</h4>
        <div className={styles.content}>
          <ul className={styles.ingredientslist}>
            {orderIngredients.map((item, index) => {
              console.log(item);
              return (
                !!item && (
                  <li className={styles.ingredientitem} key={index}>
                    <img
                      className={styles.ingredientimg}
                      src={item.image_mobile}
                      alt={item.name}
                    ></img>
                  </li>
                )
              );
            })}
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </article>
    </li>
  );
};

export default OrdersCard;
