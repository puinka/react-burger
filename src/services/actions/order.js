import postOrder from "../../utils/api.js";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export const createOrder = (ingredientsIDs) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  return postOrder(ingredientsIDs)
    .then((res) => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        number: res.order.number,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_ORDER_FAILED,
        error: err.message,
      });
    });
};
