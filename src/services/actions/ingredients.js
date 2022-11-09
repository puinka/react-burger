import { getData } from "../../utils/api";

const INGREDIENTS_REQUEST = "INGREDIENTS_REQUEST";
const INGREDIENTS_SUCCESS = "INGREDIENTS_SUCCESS";
const INGREDIENTS_FAILED = "INGREDIENTS_FAILED";

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: INGREDIENTS_REQUEST,
  });
  return getData()
    .then((res) => {
      dispatch({
        type: INGREDIENTS_SUCCESS,
        ingredients: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: INGREDIENTS_FAILED,
        error: err.message,
      });
    });
};
