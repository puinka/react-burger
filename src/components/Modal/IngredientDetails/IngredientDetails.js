import styles from "./ingredientdetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { id } = useParams();
  const { ingredients } = useSelector((store) => store.ingredients);
  const item = ingredients.find((item) => item._id === id);

  return (
    !!item && (
      <div className={`pb-12 ${styles.container}`}>
        <img
          className={`pb-4 ${styles.image}`}
          alt={item.name}
          src={item.image_large}
        />
        <h3 className="text text_type_main-medium pb-8">{item.name}</h3>
        <ul className={styles.list}>
          <li>
            <p className="text text_type_main-small text_color_inactive pb-2">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {item.calories}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small text_color_inactive pb-2">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {item.proteins}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small text_color_inactive pb-2">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {item.fat}
            </p>
          </li>
          <li>
            <p className="text text_type_main-small text_color_inactive pb-2">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {item.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    )
  );
};

export default IngredientDetails;
