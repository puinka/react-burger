import styles from "./app.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import BounceLoader from "react-spinners/BounceLoader";
import AppHeader from "../AppHeader/AppHeader";
import HomePage from "../../pages/HomePage";
import NotFound404 from "../../pages/NotFound404";
import { resetIngredientModal } from "../../services/actions/currentIngredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";

import { INGREDIENT_TYPES } from "../../utils/constants.js";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import { getCookie } from "../../utils/api";
import { getUser } from "../../services/actions/user.js";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.ingredients);
  const { currentIngredient } = useSelector((store) => store.ingredientModal);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const closeAllModals = () => {
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
          <Switch>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/">
              <HomePage closeAllModals={closeAllModals} />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route exact path="/reset-password">
              <ResetPasswordPage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/ingredients/:id">
              <IngredientDetails />
            </Route>
            <Route path="*">
              <NotFound404 />
            </Route>
          </Switch>
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
