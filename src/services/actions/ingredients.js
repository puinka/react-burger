import { getData } from "../../utils/api.js";

export const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
export const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
export const INGREDIENTS_FAILED = "INGREDIENTS_FAILED";

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: INGREDIENTS_REQUEST,
  });
  getData()
    .then((res) => {
      if (res.success) {
        dispatch({
          type: INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: INGREDIENTS_FAILED,
        error: err.message,
      });
    });
};
