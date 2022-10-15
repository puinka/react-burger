import styles from "./app.module.css";
import { INGREDIENTS_URL } from "../../utils/constants.js";
import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const [ingredients, setIngredients] = useState();
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(INGREDIENTS_URL);
      if (!res.ok) {
        const message = `Ошибка HTTP: ${res.status}`;
        throw new Error(message);
      }
      const json = await res.json();
      setIngredients(json.data);
    } catch (err) {
      alert("Ошибка: " + err);
    }
  };

  const handleCreateOrder = () => {
    setOrderDetailsOpen(true);
  };

  const handleShowIngredientDetails = (item) => {
    setIngredientDetailsOpen(true);
    setCurrentIngredient(item);
    console.log(currentIngredient);
  };

  const closeAllModals = () => {
    setOrderDetailsOpen(false);
    setIngredientDetailsOpen(false);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {ingredients && (
          <BurgerIngredients
            data={ingredients}
            handleIngredientClick={handleShowIngredientDetails}
          />
        )}
        {ingredients && (
          <BurgerConstructor data={ingredients} makeOrder={handleCreateOrder} />
        )}
      </main>
      {isOrderDetailsOpen && (
        <Modal onCloseClick={closeAllModals}>
          <OrderDetails number="034536" />
        </Modal>
      )}
      {isIngredientDetailsOpen && (
        <Modal title="Детали ингредиента" onCloseClick={closeAllModals}>
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default App;
