import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const { bun, mains } = useSelector((store) => store.currentBurger);

  const count =
    bun || mains.length > 0
      ? bun._id === item._id
        ? 2
        : mains.filter((el) => el._id === item._id).length
      : 0;

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

IngredientItem.propTypes = {
  item: ingredientProps.isRequired,
};

export default IngredientItem;
