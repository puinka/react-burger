import ProfileNav from "../components/ProfileNav/ProfileNav";
import styles from "./ordershistorypage.module.css";

const OrdersHistoryPage = () => {
  return (
    <main className={styles.container}>
      <ProfileNav />
      <h1>Orders History</h1>
    </main>
  );
};

export default OrdersHistoryPage;
