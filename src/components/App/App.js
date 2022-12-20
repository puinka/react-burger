import styles from "./app.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { getIngredients } from "../../services/actions/ingredients";
import { resetIngredientModal } from "../../services/actions/currentIngredient";
import { checkAuth } from "../../services/actions/user.js";

import BounceLoader from "react-spinners/BounceLoader";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngredientDetails/IngredientDetails";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import HomePage from "../../pages/HomePage";
import NotFound404 from "../../pages/NotFound404";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import FeedPage from "../../pages/FeedPage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  const { isLoading } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  const onModalClose = () => {
    dispatch(resetIngredientModal());
    history.replace("/");
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
          <Switch location={background || location}>
            <Route exact path="/">
              <HomePage />
            </Route>
            <ProtectedRoute onlyUnAuth exact path="/login">
              <LoginPage />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth exact path="/register">
              <RegisterPage />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth exact path="/forgot-password">
              <ForgotPasswordPage />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth exact path="/reset-password">
              <ResetPasswordPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/profile">
              <ProfilePage />
            </ProtectedRoute>
            <Route path="/ingredients/:id">
              <IngredientDetails />
            </Route>
            <Route>
              <FeedPage />
            </Route>
            <Route path="*">
              <NotFound404 />
            </Route>
          </Switch>

          {background && (
            <Route path="/ingredients/:id">
              <Modal title="Детали ингредиента" onCloseClick={onModalClose}>
                <IngredientDetails />
              </Modal>
            </Route>
          )}
        </div>
      )}
    </>
  );
}

export default App;
