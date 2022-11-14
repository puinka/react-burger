import styles from "./ingredientsblock.module.css";
import PropTypes from "prop-types";
import { ingredientProps } from "../../../utils/ingredientProps.js";
import IngredientItem from "../IngredientItem/IngredientItem";

const IngredientsBlock = ({ title, data, id }) => {
  return (
    <>
      <h3 id={id} className={`text text_type_main-medium mb-6 ${styles.title}`}>
        {title}
      </h3>
      <ul className={`pl-4 pr-2 pb-2 ${styles.ingredientsList}`}>
        {data.map((item) => (
          <IngredientItem item={item} key={item._id} />
        ))}
      </ul>
    </>
  );
};

IngredientsBlock.propTypes = {
  data: PropTypes.arrayOf(ingredientProps.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientsBlock;
