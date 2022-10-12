import styles from "./orderdetails.module.css";
import done from "../../../images/done.png";

const OrderDetails = ({ number }) => {
  return (
    <div className={`pl-30 pr-30 pb-30 ${styles.container}`}>
      <h4 className="text text_type_digits-large pt-30 pb-8">{number}</h4>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <img className={styles.image} src={done} alt="done" />
      <p className="text text_type_main-default pt-15 pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
