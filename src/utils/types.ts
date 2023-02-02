import { Location } from "history";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TCurrentBurgerActions } from "../services/actions/currentBurger";
import { TCurrentIngredientActions } from "../services/actions/currentIngredient";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TOrderActions } from "../services/actions/order";
import { TUserActions } from "../services/actions/user";
import { TwsActions } from "../services/actions/wsActionTypes";
import { rootReducer } from "../services/reducers";
// TwsActions
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

export type TUser = {
  email: string;
  name: string;
};

export type TInputValues = {
  [key: string]: string;
};

export type TOwner = {
  createdAt: string;
  email: string;
  name: string;
};

export type TOrder = {
  status: string;
  number: number;
  createdAt: string;
  name: string;
  ingredients: string[];
  _id: string;
  owner: TOwner;
  price: number;
  updatedAt: string;
};

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  | TCurrentBurgerActions
  | TCurrentIngredientActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TwsActions;

// export type AppThunk<TReturn = void> = ActionCreator<
//   ThunkAction<TReturn, Action, RootState, TApplicationActions>
// >;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

//export type AppDispatch = Dispatch<TApplicationActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
//export type AppDispatch = typeof store.dispatch;
