import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";
import {
  ADD_BUN,
  ADD_MAIN,
  DELETE_MAIN,
  REORDER_MAINS,
} from "../constants/currentBurger";

//TS
export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly item: TIngredient;
}

export interface IAddMainAction {
  readonly type: typeof ADD_MAIN;
  readonly item: TIngredient;
  currentID: string;
}

export interface IDeleteMainAction {
  readonly type: typeof DELETE_MAIN;
  readonly currentID: number;
}

export interface IReorderMainsAction {
  readonly type: typeof REORDER_MAINS;
  readonly from: number;
  readonly to: number;
}

export type TCurrentBurgerActions =
  | IAddBunAction
  | IAddMainAction
  | IDeleteMainAction
  | IReorderMainsAction;

//Action creators
export const addBun = (item: TIngredient): TCurrentBurgerActions => ({
  type: ADD_BUN,
  item: item,
});
export const addMain = (item: TIngredient): TCurrentBurgerActions => ({
  type: ADD_MAIN,
  item: item,
  currentID: uuidv4(),
});
export const deleteMain = (id: number): TCurrentBurgerActions => ({
  type: DELETE_MAIN,
  currentID: id,
});
export const reorderMains = (
  dragIndex: number,
  hoverIndex: number
): TCurrentBurgerActions => ({
  type: REORDER_MAINS,
  from: dragIndex,
  to: hoverIndex,
});
