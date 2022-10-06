import styles from "./burgerconstructor.module.css";
import PropTypes from "prop-types";
import { INGREDIENT_TYPES } from "../../utils/constants.js";
import { ingredientProps } from "../../utils/ingredientProps";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const getRandomBurger = (arr) => {
  const randomLength = Math.floor(Math.random() * 5 + 2);
  const randomBurger = [];
  for (let i = 0; i <= randomLength; i++) {
    const ranIndex = Math.floor(Math.random() * arr.length);
    randomBurger.push(arr[ranIndex]);
  }
  return randomBurger;
};

const calcFinalPrice = (bun, main) => {
  const bunPrice = bun.price * 2;

  return main.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.price;
  }, bunPrice);
};

const BurgerConstructor = (props) => {
  const bun = props.data.find((item) => item.type === INGREDIENT_TYPES.BUN);
  const main = getRandomBurger(props.data).filter(
    (item) => item.type !== INGREDIENT_TYPES.BUN
  );

  const finalPrice = calcFinalPrice(bun, main);

  return (
    <section className={`pl-4 pt-25 pr-4 ${styles.container}`}>
      <div className="ml-8">
        <ConstructorElement
          type="top"
          isLocked
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={`pr-2 ${styles.scrollContainer}`}>
        {main.map(({ name, price, image }, index) => {
          return (
            <li className={`${styles.listItem}`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement text={name} price={price} thumbnail={image} />
            </li>
          );
        })}
      </ul>
      <div className="ml-8">
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div className={`mt-10 mr-8 ${styles.order}`}>
        <div className={`mr-10 ${styles.price}`}>
          <p className="text text_type_digits-medium mr-2">{finalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientProps.isRequired).isRequired,
};

export default BurgerConstructor;
