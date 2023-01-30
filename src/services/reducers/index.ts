import { combineReducers } from "redux";
import { constructorReducer } from "./currentBurgerReducer";
import { orderReducer } from "./orderReducer";
import { ingredientsReducer } from "./ingredientsReducer";
import { currentIngredientReducer } from "./currentIngredientReducer";
import { userReducer } from "./userReducer.js";
import { wsReducer } from "./wsReducer.js";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentBurger: constructorReducer,
  ingredientModal: currentIngredientReducer,
  orderModal: orderReducer,
  user: userReducer,
  ws: wsReducer,
});
