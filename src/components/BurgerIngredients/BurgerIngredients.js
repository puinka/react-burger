import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { INGREDIENT_TYPES } from "../../utils/constants.js";
import styles from "./burgeringredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsBlock from "./IngredientsBlock/IngredientsBlock";

const BurgerIngredients = () => {
  const { ingredients } = useSelector((store) => store.ingredients);

  const [current, setCurrent] = useState(INGREDIENT_TYPES.BUN);

  const bun = ingredients.filter((item) => item.type === INGREDIENT_TYPES.BUN);
  const sauce = ingredients.filter(
    (item) => item.type === INGREDIENT_TYPES.SAUCE
  );
  const main = ingredients.filter(
    (item) => item.type === INGREDIENT_TYPES.MAIN
  );

  const handleTabClick = (id, ref) => {
    setCurrent(id);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  //scroll

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  return (
    <section className={`pt-10 mr-10 ${styles.container}`}>
      <h2 className={`text text_type_main-large mb-5 ${styles.title}`}>
        Соберите бургер
      </h2>

      <div className={`mb-10 ${styles.tabs}`}>
        <Tab
          value={INGREDIENT_TYPES.BUN}
          active={current === INGREDIENT_TYPES.BUN}
          onClick={(value) => handleTabClick(value, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value={INGREDIENT_TYPES.SAUCE}
          active={current === INGREDIENT_TYPES.SAUCE}
          onClick={(value) => handleTabClick(value, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value={INGREDIENT_TYPES.MAIN}
          active={current === INGREDIENT_TYPES.MAIN}
          onClick={(value) => handleTabClick(value, mainRef)}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.scrollContainer}>
        <IngredientsBlock
          id={INGREDIENT_TYPES.BUN}
          title="Булки"
          data={bun}
          ref={bunRef}
        />
        <IngredientsBlock
          id={INGREDIENT_TYPES.SAUCE}
          title="Соусы"
          data={sauce}
          ref={sauceRef}
        />
        <IngredientsBlock
          id={INGREDIENT_TYPES.MAIN}
          title="Начинки"
          data={main}
          ref={mainRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
