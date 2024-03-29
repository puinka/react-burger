import styles from "./ingredientsblock.module.css";
import { FC, forwardRef } from "react";
import IngredientItem from "../IngredientItem/IngredientItem";
import { Link, useLocation } from "react-router-dom";
import { TIngredient } from "../../../utils/types";

type TIngredientsBlockProps = {
  title: string;
  data: TIngredient[];
  id: string;
};

const IngredientsBlock = forwardRef<HTMLHeadingElement, TIngredientsBlockProps>(
  ({ title, data, id }, ref) => {
    const location = useLocation();

    return (
      <>
        <h3
          id={id}
          className={`text text_type_main-medium mb-6 ${styles.title}`}
          ref={ref}
        >
          {title}
        </h3>
        <ul className={`pl-4 pr-2 pb-2 ${styles.ingredientsList}`}>
          {data.map((item) => (
            <Link
              className={styles.container}
              key={item._id}
              to={{
                pathname: `/ingredients/${item._id}`,
                state: { background: location },
              }}
            >
              <IngredientItem item={item} />
            </Link>
          ))}
        </ul>
      </>
    );
  }
);

export default IngredientsBlock;
