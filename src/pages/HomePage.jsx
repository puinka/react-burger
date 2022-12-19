import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import styles from "./home.module.css";

const HomePage = () => {
  const { ingredients } = useSelector((store) => store.ingredients);
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
