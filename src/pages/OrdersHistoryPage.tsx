import { FC, useEffect } from "react";
import { useDispatch } from "../utils/hooks/useDispatch";
import { useSelector } from "../utils/hooks/useSelector";
import { BounceLoader } from "react-spinners";
import OrdersCard from "../components/Feed/OrdersCard/OrdersCard";
import ProfileNav from "../components/ProfileNav/ProfileNav";
import { wsConnectionClose, wsInit } from "../services/actions/wsActionTypes";
import { wsUrl } from "../utils/constants";
import { getCookie } from "../utils/cookie";
import styles from "./ordershistorypage.module.css";
import { selectWSdata } from "../services/selectors/wsSelectors";

const OrdersHistoryPage: FC = () => {
  const dispatch = useDispatch();

  const { orders, wsLoading } = useSelector(selectWSdata);
  const token = getCookie("accessToken");

  useEffect(() => {
    dispatch(wsInit(`${wsUrl}?token=${token}`));
    return () => {
      dispatch(wsConnectionClose());
    };
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
              {orders.reverse().map((order) => (
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
