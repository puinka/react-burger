import styles from "./burgerconstructor.module.css";
import PropTypes from "prop-types";
import { INGREDIENT_TYPES } from "../../utils/constants.js";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
//import { postOrder } from "../../utils/api.js";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addBun,
  addMain,
  deleteMain,
} from "../../services/actions/currentBurger";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = () => {
  //const currentBurger = useContext(BurgerConstructorContext);
  //const [orderNumber, setOrderNumber] = useState(0);

  const dispatch = useDispatch();
  const { bun, mains } = useSelector((store) => store.burgerConstructor);

  const totalPrice = useMemo(() => {
    return (bun ? bun.price * 2 : 0) + mains.reduce((s, v) => s + v.price, 0);
  }, [bun, mains]);

  // const bun = currentBurger.find((item) => item.type === INGREDIENT_TYPES.BUN);
  // const main = currentBurger.filter(
  //   (item) => item.type !== INGREDIENT_TYPES.BUN
  // );

  // const handleCreateOrder = async () => {
  //   const ingredientsIDs = currentBurger.map((item) => item._id);
  //   const res = await postOrder(ingredientsIDs);
  //   if (res.success) {
  //     setOrderNumber(res.order.number);
  //     setOrderDetailsOpen(true);
  //   } else {
  //     throw new Error(`Не удалось зарегистрировать Ваш заказ.`);
  //   }
  // };

  return (
    <>
      <section className={`pl-4 pt-25 pr-4 ${styles.container}`}>
        {bun && (
          <div className="ml-8">
            <ConstructorElement
              type="top"
              isLocked
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        <ul className={`pr-2 ${styles.scrollContainer}`}>
          {mains.map(({ name, price, image }, index) => {
            return (
              <li className={`${styles.listItem}`} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={name}
                  price={price}
                  thumbnail={image}
                />
              </li>
            );
          })}
        </ul>
        {bun && (
          <div className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
        {bun && (
          <div className={`mt-10 mr-8 ${styles.order}`}>
            <div className={`mr-10 ${styles.price}`}>
              <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              type="primary"
              size="large"
              //onClick={handleCreateOrder}
              htmlType="button"
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </section>
      {/* {isOrderDetailsOpen && (
        <Modal onCloseClick={closeAllModals}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )} */}
    </>
  );
};

BurgerConstructor.propTypes = {
  //closeAllModals: PropTypes.func.isRequired,
  //setOrderDetailsOpen: PropTypes.func.isRequired,
  //isOrderDetailsOpen: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
