import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BounceLoader } from "react-spinners";
import OrdersCard from "../components/Feed/OrdersCard/OrdersCard";
import ProfileNav from "../components/ProfileNav/ProfileNav";
import { wsConnectionClose, wsInit } from "../services/actions/wsActionTypes";
import { wsUrlAll } from "../utils/constants";
import styles from "./ordershistorypage.module.css";

const OrdersHistoryPage = () => {
  const dispatch = useDispatch();

  const { orders, wsLoading } = useSelector((store) => store.ws);
  console.log(wsLoading);

  useEffect(() => {
    dispatch(wsInit(wsUrlAll));
    return dispatch(wsConnectionClose());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <ProfileNav />
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
                  <OrdersCard order={order} isMine />
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </main>
  );
};

export default OrdersHistoryPage;
