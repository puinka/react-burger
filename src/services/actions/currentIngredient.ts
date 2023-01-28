import {
  RESET_INGREDIENT_MODAL,
  SET_INGREDIENT_MODAL,
} from "../constants/currentIngredient";
import { TIngredient } from "../../utils/types";

//TS
export interface ISetIngredientModalAction {
  readonly type: typeof SET_INGREDIENT_MODAL;
  readonly item: TIngredient;
}

export interface IResetIngredientModalAction {
  readonly type: typeof RESET_INGREDIENT_MODAL;
  readonly item: null;
}

export type TCurrentIngredientActions =
  | ISetIngredientModalAction
  | IResetIngredientModalAction;

//Action Creators
export const setIngredientModal = (
  item: TIngredient
): TCurrentIngredientActions => ({
  type: SET_INGREDIENT_MODAL,
  item: item,
});

export const resetIngredientModal = (): TCurrentIngredientActions => ({
  type: RESET_INGREDIENT_MODAL,
  item: null,
});
