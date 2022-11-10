import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ingredientProps } from "../../../utils/ingredientProps.js";
import styles from "./ingredientitem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setIngredientModal } from "../../../services/actions/currentIngredient.js";
import { addBun, addMain } from "../../../services/actions/currentBurger.js";

import { INGREDIENT_TYPES } from "../../../utils/constants.js";

const IngredientItem = ({ item }) => {
  const [count, setCount] = useState(3);

  const dispatch = useDispatch();

  // const onIngredientClick = () => {
  //   handleIngredientClick(item);
  // };

  const handleIngredientAdd = (item) => {
    //TEMPORARY -> put back to onClick when DnD is done
    dispatch(setIngredientModal(item));

    if (item.type === INGREDIENT_TYPES.BUN) {
      return dispatch(addBun(item));
    } else {
      return dispatch(addMain(item));
    }
  };

  return (
    <li
      className={`pl-4 pr-4 pb-3 mr-6 mb-8 ${styles.container}`}
      onClick={() => handleIngredientAdd(item)}
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
