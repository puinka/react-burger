import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { OrderInfo } from "../components/Modal/OrderInfo/OrderInfo";
import { wsConnectionClose, wsInit } from "../services/actions/wsActionTypes";
import { wsUrl, wsUrlAll } from "../utils/constants";
import { getCookie } from "../utils/cookie";
import styles from "./orderinfopage.module.css";

const OrderInfoPage = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const token = getCookie("accessToken");

  const url = path === "/feed/:id" ? wsUrlAll : `${wsUrl}?token=${token}`;

  useEffect(() => {
    dispatch(wsInit(url));
    return dispatch(wsConnectionClose());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <OrderInfo />
    </main>
  );
};

export default OrderInfoPage;
