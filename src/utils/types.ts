import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TCurrentBurgerActions } from "../services/actions/currentBurger";
import { TCurrentIngredientActions } from "../services/actions/currentIngredient";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TOrderActions } from "../services/actions/order";
import { TUserActions } from "../services/actions/user";
import { TwsActions } from "../services/actions/wsActionTypes";
import { rootReducer } from "../services/reducers";

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
  currentID?: string;
};

export type TUser = {
  email: string;
  name: string;
  restoreEmail?: boolean;
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

export type TLocation = {
  from: string;
  background: {
    pathname: string;
    search: string;
    hash: string;
    state: null;
    key: string;
  };
  state?: object;
};

export type TInputValues = {
  [key: string]: string;
};

//api
export type TIngredientsResponse = {
  data: { data: TIngredient[]; success: boolean };
  status: number;
};

export type TOrderResponse = {
  data: { order: TOrder; success: boolean };
  status: number;
};

export type TRegisterResponse = {
  data: {
    user: TUser;
    success: boolean;
    accessToken: string;
    refreshToken: string;
  };
  status: number;
};

export type TLoginResponse = {
  data: {
    user: TUser;
    success: boolean;
    accessToken: string;
    refreshToken: string;
  };
  status: number;
};

export type TTokenRefreshResponse = {
  data: {
    user: TUser;
    success: boolean;
    accessToken: string;
    refreshToken: string;
  };
  status: number;
};

export type TErrorResponse = {
  response: { data: { message: string } };
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TUpdateUserResponse = TRegisterResponse;

export type TPasswordResetEmail = TRegisterResponse;

export type TPasswordResetConfirm = { success: boolean; message: string };

//index

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
