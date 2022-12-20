import styles from "./orderscard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrdersCard = () => {
  return (
    <li>
      <article className={`p-6 ${styles.container}`}>
        <div className={styles.info}>
          <p className="text text_type_digits-default">#034535</p>
          {/* FormattedDate */}
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </p>
        </div>
        <h4 className="text text_type_main-medium">
          Death Star Starship Main бургер
        </h4>
        <div className={styles.content}>
          <ul className={styles.ingredientslist}>
            <li className={styles.ingredientitem}>
              <img
                className={styles.ingredientimg}
                src="https://images.unsplash.com/photo-1582215669338-6cfdb76bca45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              ></img>
            </li>
            <li className={styles.ingredientitem}>
              <img
                className={styles.ingredientimg}
                src="https://images.unsplash.com/photo-1582215669338-6cfdb76bca45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              ></img>
            </li>
            <li className={styles.ingredientitem}>
              <img
                className={styles.ingredientimg}
                src="https://images.unsplash.com/photo-1582215669338-6cfdb76bca45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              ></img>
            </li>
            <li className={styles.ingredientitem}>
              <img
                className={styles.ingredientimg}
                src="https://images.unsplash.com/photo-1582215669338-6cfdb76bca45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              ></img>
            </li>
          </ul>
          <div className={styles.price}>
            <p className="text text_type_digits-default">480</p>
            <CurrencyIcon />
          </div>
        </div>
      </article>
    </li>
  );
};

export default OrdersCard;
