import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { ingredientProps } from "../../../utils/ingredientProps.js";
import styles from "./ingredientitem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setIngredientModal } from "../../../services/actions/currentIngredient.js";

const IngredientItem = ({ item }) => {
  const dispatch = useDispatch();
  const { bun, mains } = useSelector((store) => store.currentBurger);

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const count =
    bun && bun._id === item._id
      ? 2
      : mains.length > 0
      ? mains.filter((el) => el._id === item._id).length
      : 0;

  return (
    <li
      className={`pl-4 pr-4 pb-3 mr-6 mb-8 ${isDrag ? styles.dragging : ``}`}
      onClick={() => dispatch(setIngredientModal(item))}
      draggable
      ref={dragRef}
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
