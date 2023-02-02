import { getData } from "../../utils/api";
import { AppDispatch, AppThunk, TIngredient } from "../../utils/types";
import {
  INGREDIENTS_FAILED,
  INGREDIENTS_REQUEST,
  INGREDIENTS_SUCCESS,
} from "../constants/ingredients";

interface IIngredientsRequestAction {
  readonly type: typeof INGREDIENTS_REQUEST;
}

interface IIngredientsSuccessAction {
  readonly type: typeof INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

interface IIngredientsFailedAction {
  readonly type: typeof INGREDIENTS_FAILED;
  readonly error: string;
}

export type TIngredientsActions =
  | IIngredientsRequestAction
  | IIngredientsSuccessAction
  | IIngredientsFailedAction;

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({
    type: INGREDIENTS_REQUEST,
  });
  getData()
    .then((res) => {
      dispatch({
        type: INGREDIENTS_SUCCESS,
        ingredients: res.data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: INGREDIENTS_FAILED,
        error: err.message,
      });
    });
};
