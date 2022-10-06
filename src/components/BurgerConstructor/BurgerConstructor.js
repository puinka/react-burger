import styles from "./burgerconstructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data.js";

const getRandomBurger = () => {
  const randomLength = Math.floor(Math.random() * 5 + 2);
  const randomBurger = [];
  for (let i = 0; i <= randomLength; i++) {
    const ranIndex = Math.floor(Math.random() * data.length);
    randomBurger.push(data[ranIndex]);
  }
  return randomBurger;
};

const bun = data.find((item) => item.type === "bun");
const main = getRandomBurger().filter((item) => item.type !== "bun");

const BurgerConstructor = () => {
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
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
