import styles from "./app.module.css";
import { URL } from "../../utils/constants.js";
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

  const [serverData, setServerData] = useState();
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [isIngredientDetailsOpen, setIngredientDetailsOpen] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setServerData(data.data);
    } catch (err) {
      console.log(err);
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

  const handleEscKeyDown = (evt) => {
    evt.key === "Escape" && closeAllModals();
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {serverData && (
          <BurgerIngredients
            data={serverData}
            onClick={handleShowIngredientDetails}
          />
        )}
        {serverData && (
          <BurgerConstructor data={serverData} onClick={handleCreateOrder} />
        )}
      </main>
      {isOrderDetailsOpen && (
        <Modal onCloseClick={closeAllModals} onEscKeydown={handleEscKeyDown}>
          <OrderDetails number="034536" />
        </Modal>
      )}
      {isIngredientDetailsOpen && (
        <Modal
          title="Детали ингредиента"
          onCloseClick={closeAllModals}
          onEscKeydown={handleEscKeyDown}
        >
          <IngredientDetails item={currentIngredient} />
        </Modal>
      )}
    </div>
  );
}

export default App;
