import { combineReducers } from "redux";
import { currentBurgerReducer } from "./currentBurgerReducer";
import { orderReducer } from "./orderReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { userReducer } from "./userReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentBurger: currentBurgerReducer,
  ingredientModal: currentIngredientReducer,
  orderModal: orderReducer,
  user: userReducer,
  ws: wsReducer,
});
