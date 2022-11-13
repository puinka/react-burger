import { useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerconstructoritem.module.css";
import {
  deleteMain,
  reorderMains,
} from "../../../services/actions/currentBurger";

function BurgerConstructorItem({ item, index }) {
  const { currentID, name, image, price } = item;
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "reorder",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "reorder",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(reorderMains(dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      className={`${styles.listItem} ${isDragging ? styles.isDragging : ``} ${
        isOver ? styles.isOver : ``
      }`}
      key={currentID}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => dispatch(deleteMain(currentID))}
      />
    </li>
  );
}

BurgerConstructorItem.propTypes = {
  //   currentID: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  //   image: PropTypes.string.isRequired,
  handleReorder: PropTypes.func,
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorItem;
