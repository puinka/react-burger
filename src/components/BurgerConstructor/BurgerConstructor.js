import { useDrop } from "react-dnd";
import { addBun, addMain } from "../../services/actions/currentBurger";
import styles from "./burgerconstructor.module.css";
import { INGREDIENT_TYPES } from "../../utils/constants.js";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import BurgerConstructorItem from "./BurgerConstructorItem/BurgerConstructorItem";

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { createOrder } from "../../services/actions/order";
import { useHistory } from "react-router-dom";
import { RESET_ORDER } from "../../services/constants/order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { bun, mains } = useSelector((store) => store.currentBurger);
  const { number, isLoading } = useSelector((store) => store.orderModal);
  const isUser = useSelector((store) => store.user.data);

  const totalPrice = useMemo(() => {
    return (bun ? bun.price * 2 : 0) + mains.reduce((s, v) => s + v.price, 0);
  }, [bun, mains]);

  const ingrIDs = useMemo(() => {
    return bun && [bun._id, ...mains.map((item) => item._id), bun._id];
  }, [bun, mains]);

  const handleAddIngredient = (item) => {
    if (item.type === INGREDIENT_TYPES.BUN) {
      return dispatch(addBun(item));
    } else {
      return dispatch(addMain(item));
    }
  };

  const handleCreateOrder = () => {
    if (!isUser) {
      history.push("/login");
    } else {
      dispatch(createOrder(ingrIDs));
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: RESET_ORDER });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleAddIngredient(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <>
      <section
        className={`pl-4 pt-25 pr-4 ${styles.container} ${
          isHover ? styles.isHover : ``
        }`}
        ref={dropTarget}
      >
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
          {mains.map((item, index) => {
            return (
              <BurgerConstructorItem
                item={item}
                index={index}
                key={item.currentID}
              />
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
              htmlType="button"
              onClick={handleCreateOrder}
            >
              {isLoading ? `Отправка...` : `Оформить заказ`}
            </Button>
          </div>
        )}
      </section>
      {number && (
        <Modal onCloseClick={handleCloseModal}>
          <OrderDetails number={number} />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
