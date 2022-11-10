import { useState } from "react";
import PropTypes from "prop-types";
import { ingredientProps } from "../../../utils/ingredientProps.js";
import styles from "./ingredientitem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setIngredientModal } from "../../../services/actions/currentIngredient.js";

import { useDispatch } from "react-redux";

const IngredientItem = ({ item }) => {
  const [count, setCount] = useState(3);

  const dispatch = useDispatch();

  // const onIngredientClick = () => {
  //   handleIngredientClick(item);
  // };
  return (
    <li
      className={`pl-4 pr-4 pb-3 mr-6 mb-8 ${styles.container}`}
      onClick={() => dispatch(setIngredientModal(item))}
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

// IngredientItem.propTypes = {
//   item: ingredientProps.isRequired,
//   handleIngredientClick: PropTypes.func.isRequired,
// };

export default IngredientItem;
