import styles from "./app.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/actions/ingredients";
import BounceLoader from "react-spinners/BounceLoader";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { resetIngredientModal } from "../../services/actions/currentIngredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

import { INGREDIENT_TYPES } from "../../utils/constants.js";

function App() {
  const dispatch = useDispatch();
  const { isLoading, ingredients } = useSelector((store) => store.ingredients);
  const { currentIngredient } = useSelector((store) => store.ingredientModal);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeAllModals = () => {
    // setOrderDetailsOpen(false);
    dispatch(resetIngredientModal());
  };

  return (
    <>
      {isLoading ? (
        <BounceLoader
          className={styles.loader}
          color="#4C4CFF"
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className={styles.app}>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              {ingredients && (
                <BurgerIngredients closeAllModals={closeAllModals} />
              )}
              <BurgerConstructor />
            </main>
          </DndProvider>
        </div>
      )}
      {currentIngredient && (
        <Modal title="Детали ингредиента" onCloseClick={closeAllModals}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
    </>
  );
}

export default App;
