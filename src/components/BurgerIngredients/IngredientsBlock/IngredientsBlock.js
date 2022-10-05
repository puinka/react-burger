import styles from "./ingredientsblock.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";

const IngredientsBlock = ({ title, data }) => {
  return (
    <>
      <h3 className={`text text_type_main-medium mb-6 ${styles.title}`}>
        {title}
      </h3>
      <ul className={`pl-4 pr-4 pb-2 ${styles.ingredientsList}`}>
        {data.map((item) => (
          <IngredientItem item={item} key={item._id} />
        ))}
      </ul>
    </>
  );
};

export default IngredientsBlock;
