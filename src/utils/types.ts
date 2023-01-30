import { Dispatch, Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TCurrentBurgerActions } from "../services/actions/currentBurger";
import { TCurrentIngredientActions } from "../services/actions/currentIngredient";
import { TIngredientsActions } from "../services/actions/ingredients";
import { store } from "../services/store";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  currentID?: number;
};

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TCurrentBurgerActions
  | TCurrentIngredientActions
  | TIngredientsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;
