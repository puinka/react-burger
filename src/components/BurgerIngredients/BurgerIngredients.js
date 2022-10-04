import React, { useState } from "react";
import styles from "./burgeringredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("Начинки");
  return (
    <section>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div className={styles.tabs}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
    </section>
  );
};

export default BurgerIngredients;
