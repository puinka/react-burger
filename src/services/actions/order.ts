import { postOrder } from "../../utils/api";
import { AppDispatch, AppThunk } from "../../utils/types";
import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  RESET_ORDER,
} from "../constants/order";

interface IOrderRequestAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

interface IOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly number: number;
}

interface IOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
  readonly error: string;
}

interface IOrderResetAction {
  readonly type: typeof RESET_ORDER;
  readonly number: null;
  readonly error: null;
}

export type TOrderActions =
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderFailedAction
  | IOrderResetAction;

export const createOrder =
  (ingredientsIDs: string[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    postOrder(ingredientsIDs)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          number: res.data.order.number,
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_ORDER_FAILED,
          error: err.message,
        });
      });
  };

export const orderReset = (): TOrderActions => ({
  type: RESET_ORDER,
  number: null,
  error: null,
});
