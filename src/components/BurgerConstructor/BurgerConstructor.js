import styles from "./burgerconstructor.module.css";
import PropTypes from "prop-types";
import { INGREDIENT_TYPES } from "../../utils/constants.js";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteMain } from "../../services/actions/currentBurger";
import { createOrder, RESET_ORDER } from "../../services/actions/order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, mains } = useSelector((store) => store.currentBurger);
  const { number, isLoading } = useSelector((store) => store.orderModal);

  const totalPrice = useMemo(() => {
    return (bun ? bun.price * 2 : 0) + mains.reduce((s, v) => s + v.price, 0);
  }, [bun, mains]);

  const ingrIDs = useMemo(() => {
    return bun || mains.length > 0
      ? [bun._id, ...mains.map((item) => item._id)]
      : null;
  }, [bun, mains]);

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
          {mains.map(({ currentID, name, price, image }) => {
            return (
              <li className={`${styles.listItem}`} key={currentID}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={name}
                  price={price}
                  thumbnail={image}
                  handleClose={() => dispatch(deleteMain(currentID))}
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
              onClick={() => dispatch(createOrder(ingrIDs))}
            >
              {isLoading ? `Отправка...` : `Оформить заказ`}
            </Button>
          </div>
        )}
      </section>
      {number && (
        <Modal onCloseClick={() => dispatch({ type: RESET_ORDER })}>
          <OrderDetails number={number} />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  //closeAllModals: PropTypes.func.isRequired,
  //setOrderDetailsOpen: PropTypes.func.isRequired,
  //isOrderDetailsOpen: PropTypes.bool.isRequired,
};

export default BurgerConstructor;
