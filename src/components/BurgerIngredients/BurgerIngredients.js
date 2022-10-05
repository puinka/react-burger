import { useState } from "react";
import styles from "./burgeringredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsBlock from "./IngredientsBlock/IngredientsBlock";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState("Начинки");
  const bun = data.filter((item) => item.type === "bun");
  const sauce = data.filter((item) => item.type === "sauce");
  const main = data.filter((item) => item.type === "main");
  return (
    <section className={`pt-10 ${styles.container}`}>
      <h2 className={`text text_type_main-large mb-5 ${styles.title}`}>
        Соберите бургер
      </h2>
      <div className={`mb-10 ${styles.tabs}`}>
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
      <IngredientsBlock title="Булки" data={bun} />
      <IngredientsBlock title="Соусы" data={sauce} />
      <IngredientsBlock title="Начинки" data={main} />
    </section>
  );
};

export default BurgerIngredients;
