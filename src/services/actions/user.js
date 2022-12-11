import { registerRequest, loginRequest } from "../../utils/api";
import { setCookie } from "../../utils/api";
import { getUserRequest } from "../../utils/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const register = (form) => (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });
  registerRequest(form)
    .then((res) => {
      const authToken = res.accessToken.split("Bearer ")[1];
      setCookie("accessToken", authToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch({
        type: REGISTER_SUCCESS,
        user: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILED,
        error: err.message,
      });
    });
};

export const login = (form) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  loginRequest(form)
    .then((res) => {
      const authToken = res.accessToken.split("Bearer ")[1];
      setCookie("accessToken", authToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch({
        type: LOGIN_SUCCESS,
        user: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAILED,
        error: err.message,
      });
    });
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });
  getUserRequest()
    .then((res) => {
      dispatch({
        type: USER_SUCCESS,
        user: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_FAILED,
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
