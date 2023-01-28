import { combineReducers } from "redux";
import { constructorReducer } from "./currentBurgerReducer.ts";
import { orderReducer } from "./orderReducer.js";
import { ingredientsReducer } from "./ingredientsReducer.js";
import { currentIngredientReducer } from "./currentIngredientReducer.ts";
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
