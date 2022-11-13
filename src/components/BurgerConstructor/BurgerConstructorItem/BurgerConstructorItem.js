import React from "react";
import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerconstructoritem.module.css";
import { deleteMain } from "../../../services/actions/currentBurger";

function BurgerConstructorItem({ currentID, name, price, image }) {
  const dispatch = useDispatch();
  return (
    <li className={`${styles.listItem}`} key={currentID}>
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

export default BurgerConstructorItem;
