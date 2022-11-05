import styles from "./app.module.css";
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";

import { handleServerRequest } from "../../utils/api.js";

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
      const json = await handleServerRequest();
      setIngredients(json.data);
    } catch (err) {
      alert("Ошибка: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrder = () => {
    setOrderDetailsOpen(true);
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
                isIngredientDetailsOpen={isIngredientDetailsOpen}
                closeAllModals={closeAllModals}
                setIngredientDetailsOpen={setIngredientDetailsOpen}
              />
            )}
            {ingredients && (
              <BurgerConstructorContext.Provider value={ingredients}>
                <BurgerConstructor makeOrder={handleCreateOrder} />
              </BurgerConstructorContext.Provider>
            )}
          </main>
          {isOrderDetailsOpen && (
            <Modal onCloseClick={closeAllModals}>
              <OrderDetails number="034536" />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}

export default App;
