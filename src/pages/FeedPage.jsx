import Completed from "../components/Feed/Completed/Completed";
import OrdersCard from "../components/Feed/OrdersCard/OrdersCard";
import styles from "./feedpage.module.css";

export const FeedPage = () => {
  return (
    <main className={`pt-10 ${styles.container}`}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={styles.mainwrap}>
        <ul className={`pr-2 ${styles.cardslist}`}>
          <OrdersCard />
          <OrdersCard />
          <OrdersCard />
          <OrdersCard />
          <OrdersCard />
        </ul>
        <div className={styles.stats}>
          <div className={styles.orderswrap}>
            <div className={styles.ordersboard}>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <ul className={styles.statslist}>
                <li
                  className={`text text_type_digits-default ${styles.success}`}
                >
                  034533
                </li>
                <li
                  className={`text text_type_digits-default ${styles.success}`}
                >
                  034533
                </li>
                <li
                  className={`text text_type_digits-default ${styles.success}`}
                >
                  034533
                </li>
                <li
                  className={`text text_type_digits-default ${styles.success}`}
                >
                  034533
                </li>
                <li
                  className={`text text_type_digits-default ${styles.success}`}
                >
                  034533
                </li>
              </ul>
            </div>
            <div className={styles.ordersboard}>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <ul className={styles.statslist}>
                <li className="text text_type_digits-default">034533</li>
                <li className="text text_type_digits-default">034533</li>
                <li className="text text_type_digits-default">034533</li>
              </ul>
            </div>
          </div>
          <Completed title="Выполнено за все время:" value="28 752" />
          <Completed title="Выполнено за сегодня:" value="138" />
        </div>
      </div>
    </main>
  );
};

export default FeedPage;
