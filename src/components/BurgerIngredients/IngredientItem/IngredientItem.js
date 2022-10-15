import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientProps } from "../../../utils/ingredientProps.js";
import styles from "./ingredientitem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem = ({ item, handleIngredientClick }) => {
  const [count, setCount] = useState(3);
  return (
    <li
      className={`pl-4 pr-4 pb-3 mr-6 mb-8 ${styles.container}`}
      onClick={() => handleIngredientClick(item)}
    >
      <img src={item.image} alt={item.name} />
      <div className={`mt-1 mb-1 ${styles.price}`}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
      {count !== 0 && <Counter count={count} size="default" />}
    </li>
  );
};

IngredientItem.propTypes = {
  item: ingredientProps.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientItem;
