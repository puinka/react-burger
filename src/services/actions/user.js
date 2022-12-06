import { registerRequest } from "../../utils/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const register = (form) => (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });
  registerRequest(form)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        user: res.user,
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILED,
        error: err.message,
      });
    });
};

// export const checkAuth = () => (dispatch) => {
//   if (getCookie("accessToken")) {
//     dispatch(getUser().finally(() => dispatch({ type: AUTH_CHECKED })));
//   } else {
//     dispatch({ type: AUTH_CHECKED }
// }}

// const getUser = () => (dispatch) => {
//   // dispatch запрос USER_REQUEST
//   //эта функция проверяет не протух ли токен
//   return getUserApi()
//     .then((res) => {
//       //dispatch add user
//     })
//     .catch(() => {
//       //dispatch error
//     });
// };