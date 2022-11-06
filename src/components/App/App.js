import styles from "./app.module.css";
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import { getIngredients } from "../../utils/api.js";

import { BurgerConstructorContext } from "../../services/burgerConstructorContext";

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState();
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getIngredients();
      setIngredients(data);
    } catch (err) {
      alert("Ошибка: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAllModals = () => {
    setOrderDetailsOpen(false);
    setIngredientDetailsOpen(false);
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
          <main className={styles.main}>
            {ingredients && (
              <BurgerIngredients
                data={ingredients}
                closeAllModals={closeAllModals}
                isIngredientDetailsOpen={isIngredientDetailsOpen}
                setIngredientDetailsOpen={setIngredientDetailsOpen}
              />
            )}
            {ingredients && (
              <BurgerConstructorContext.Provider value={ingredients}>
                <BurgerConstructor
                  closeAllModals={closeAllModals}
                  setOrderDetailsOpen={setOrderDetailsOpen}
                  isOrderDetailsOpen={isOrderDetailsOpen}
                />
              </BurgerConstructorContext.Provider>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default App;
