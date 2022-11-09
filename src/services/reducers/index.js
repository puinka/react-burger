import { combineReducers } from "redux";
import { constructorReducer } from "./constructorReducer.js";
import { orderReducer } from "./orderReducer.js";
import { ingredientsReducer } from "./ingredientsReducer.js";

export const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
});
