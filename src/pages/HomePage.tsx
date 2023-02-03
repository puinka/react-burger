import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "../utils/hooks/useSelector";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import styles from "./home.module.css";
import { FC } from "react";
import { selectIngredients } from "../services/selectors/ingredientsSelectors";

const HomePage: FC = () => {
  const ingredients = useSelector(selectIngredients);
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        {ingredients && <BurgerIngredients />}
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
};

export default HomePage;
