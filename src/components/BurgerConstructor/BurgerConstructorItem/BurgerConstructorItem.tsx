import { useRef, FC } from "react";
import { useDispatch } from "../../../utils/hooks/useDispatch";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerconstructoritem.module.css";
import {
  deleteMain,
  reorderMains,
} from "../../../services/actions/currentBurger";
import { TIngredient } from "../../../utils/types";

type TBurgerConstructorItemProps = {
  item: TIngredient;
  index: number;
};

const BurgerConstructorItem: FC<TBurgerConstructorItemProps> = ({
  item,
  index,
}) => {
  const { currentID, name, image, price } = item;
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const handleDeleteMain = () => {
    currentID && dispatch(deleteMain(currentID));
  };

  const [{ isDragging }, drag] = useDrag({
    type: "reorder",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "reorder",
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y
        ? clientOffset?.y - hoverBoundingRect.top
        : 0;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(reorderMains(dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
    collect: (monitor) => ({ isOver: monitor.isOver }),
  });

  drag(drop(ref));

  return (
    <li
      className={`${styles.listItem} ${isDragging ? styles.isDragging : ``} `}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleDeleteMain}
      />
    </li>
  );
};

export default BurgerConstructorItem;
