import { useState } from "react";
import { INGREDIENT_TYPES } from "../../utils/constants.js";
import styles from "./burgeringredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsBlock from "./IngredientsBlock/IngredientsBlock";
import PropTypes from "prop-types";
import { ingredientProps } from "../../utils/ingredientProps";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

const BurgerIngredients = ({
  data,
  isIngredientDetailsOpen,
  closeAllModals,
  setIngredientDetailsOpen,
}) => {
  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const bun = data.filter((item) => item.type === INGREDIENT_TYPES.BUN);
  const sauce = data.filter((item) => item.type === INGREDIENT_TYPES.SAUCE);
  const main = data.filter((item) => item.type === INGREDIENT_TYPES.MAIN);

  const handleIngredientClick = (item) => {
    setIngredientDetailsOpen(true);
    setCurrentIngredient(item);
  };

  return (
    <>
      <section className={`pt-10 mr-10 ${styles.container}`}>
        <h2 className={`text text_type_main-large mb-5 ${styles.title}`}>
          Соберите бургер
        </h2>

        <div className={`mb-10 ${styles.tabs}`}>
          <Tab
            value={INGREDIENT_TYPES.BUN}
            active={current === INGREDIENT_TYPES.BUN}
            onClick={setCurrent}
          >
            Булки
          </Tab>
          <Tab
            value={INGREDIENT_TYPES.SAUCE}
            active={current === INGREDIENT_TYPES.SAUCE}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
          <Tab
            value={INGREDIENT_TYPES.MAIN}
            active={current === INGREDIENT_TYPES.MAIN}
            onClick={setCurrent}
          >
            Начинки
          </Tab>
        </div>

        <div className={styles.scrollContainer}>
          <IngredientsBlock
            title="Булки"
            data={bun}
            handleIngredientClick={handleIngredientClick}
          />
          <IngredientsBlock
            title="Соусы"
            data={sauce}
            handleIngredientClick={handleIngredientClick}
          />
          <IngredientsBlock
            title="Начинки"
            data={main}
            handleIngredientClick={handleIngredientClick}
          />
        </div>
      </section>
      {isIngredientDetailsOpen && (
        <Modal title="Детали ингредиента" onCloseClick={closeAllModals}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientProps.isRequired).isRequired,
};

export default BurgerIngredients;
