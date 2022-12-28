import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BounceLoader } from "react-spinners";
import Completed from "../components/Feed/Completed/Completed";
import OrdersCard from "../components/Feed/OrdersCard/OrdersCard";
import { wsConnectionClose, wsInit } from "../services/actions/wsActionTypes";
import { wsUrlAll } from "../utils/constants";
import styles from "./feedpage.module.css";

const FeedPage = () => {
  const dispatch = useDispatch();

  const { orders, total, totalToday, wsLoading } = useSelector(
    (store) => store.ws
  );

  const doneOrders = orders
    .filter((order) => order.status === "done")
    .slice(1)
    .slice(-10);

  const pendingOrders = orders
    .filter((order) => order.status === "pending")
    .slice(1)
    .slice(-10);

  useEffect(() => {
    dispatch(wsInit(wsUrlAll));
    return dispatch(wsConnectionClose());
  }, [dispatch]);

  return (
    <main className={`pt-10 ${styles.container}`}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      {wsLoading ? (
        <BounceLoader
          color="#4C4CFF"
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        orders && (
          <div className={styles.mainwrap}>
            <ul className={`pr-2 ${styles.cardslist}`}>
              {orders.map((order) => (
                <li key={order._id}>
                  <OrdersCard order={order} />
                </li>
              ))}
            </ul>
            <div className={styles.stats}>
              <div className={styles.orderswrap}>
                <div className={styles.ordersboard}>
                  <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                  <ul className={styles.statslist}>
                    {doneOrders.map((order) => (
                      <li
                        key={order.number}
                        className={`text text_type_digits-default ${styles.success}`}
                      >
                        {order.number}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.ordersboard}>
                  <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                  <ul className={styles.statslist}>
                    {pendingOrders.map((order) => (
                      <li className="text text_type_digits-default">
                        {order.number}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Completed title="Выполнено за все время:" value={total} />
              <Completed title="Выполнено за сегодня:" value={totalToday} />
            </div>
          </div>
        )
      )}
    </main>
  );
};

export default FeedPage;
