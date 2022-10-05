import { useState } from "react";
import styles from "./ingredientitem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ item }) => {
  const [count, setCount] = useState(3);
  return (
    <li className={`pl-4 pr-4 pb-3 mr-6 mb-8 ${styles.container}`}>
      <img src={item.image} />
      <div className={`mt-1 mb-1 ${item.price}`}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
      {count !== 0 && <Counter count={count} size="default" />}
    </li>
  );
};

export default IngredientItem;
