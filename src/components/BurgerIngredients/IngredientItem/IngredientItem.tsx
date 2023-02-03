import { useDispatch } from "../../../utils/hooks/useDispatch";
import { useSelector } from "../../../utils/hooks/useSelector";
import { useDrag } from "react-dnd";
import styles from "./ingredientitem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setIngredientModal } from "../../../services/actions/currentIngredient";
import { FC } from "react";
import { TIngredient } from "../../../utils/types";
import {
  selectBun,
  selectMains,
} from "../../../services/selectors/currentBurgerSelectors";

type TIngredientsItemProps = {
  item: TIngredient;
};

const IngredientItem: FC<TIngredientsItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const bun = useSelector(selectBun);
  const mains = useSelector(selectMains);

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
      ? mains.filter((el: TIngredient) => el._id === item._id).length
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

export default IngredientItem;
