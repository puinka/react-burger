import { postOrder } from "../../utils/api";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const RESET_ORDER = "RESET_ORDER";

export const createOrder = (ingredientsIDs) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  postOrder(ingredientsIDs)
    .then((res) => {
      if (res.success) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          number: res.order.number,
        });
      } else {
        dispatch({
          type: CREATE_ORDER_FAILED,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: CREATE_ORDER_FAILED,
        error: err.message,
      });
    });
};
