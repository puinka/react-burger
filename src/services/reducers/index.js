import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer.js";
import { orderReducer } from "./orderReducer.js";
import { ingredientsReducer } from "./ingredientsReducer.js";
import { currentIngredientReducer } from "./currentIngredientReducer.js";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentBurger: constructorReducer,
  ingredientModal: currentIngredientReducer,
  orderModal: orderReducer,
});
