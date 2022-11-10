import styles from "./app.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import BounceLoader from "react-spinners/BounceLoader";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { resetIngredientModal } from "../../services/actions/currentIngredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

import { INGREDIENT_TYPES } from "../../utils/constants.js";

// const getRandomBurger = (arr) => {
//   const randomLength = Math.floor(Math.random() * 5 + 2);
//   const randomBurger = [];
//   for (let i = 0; i <= randomLength; i++) {
//     const ranIndex = Math.floor(Math.random() * arr.length);
//     randomBurger.push(arr[ranIndex]);
//   }
//   if (
//     randomBurger.filter((item) => item.type === INGREDIENT_TYPES.BUN).length < 1
//   ) {
//     randomBurger.push(arr.find((item) => item.type === INGREDIENT_TYPES.BUN));
//   }

//   return randomBurger;
// };

function App() {
  const dispatch = useDispatch();
  const { isLoading, ingredients } = useSelector((store) => store.ingredients);
  const { currentIngredient } = useSelector((store) => store.ingredientModal);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  //const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(false);
  //const [currentBurger, setCurrentBurger] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const data = await getIngredients();
  //     setIngredients(data);
  //     const resBurger = getRandomBurger(data);
  //     setCurrentBurger(resBurger);
  //   } catch (err) {
  //     alert("Ошибка: " + err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
          <main className={styles.main}>
            {ingredients && (
              <BurgerIngredients closeAllModals={closeAllModals} />
            )}
            <BurgerConstructor />
          </main>
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
