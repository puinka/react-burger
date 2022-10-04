import styles from "./ingredientsblock.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";

const IngredientsBlock = ({ title }) => {
  return (
    <>
      <h3 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        {title}
      </h3>
      <ul className={`pl-4 pr-4 pb-2 ${styles.ingredientsList}`}>
        <IngredientItem />
        <IngredientItem />
      </ul>
    </>
  );
};

export default IngredientsBlock;
