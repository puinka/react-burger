import {
  registerRequest,
  loginRequest,
  refreshTokenRequest,
  updateUserRequest,
  passwordResetEmailRequest,
  passwordResetConfirmRequest,
} from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookie";
import { getUserRequest, logoutRequest } from "../../utils/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const AUTH_CHECKED = "AUTH_CHECKED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    registerRequest(name, email, password)
      .then((res) => {
        const authToken = res.data.accessToken.split("Bearer ")[1];
        setCookie("accessToken", authToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch({
          type: REGISTER_SUCCESS,
          user: res.data.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
          error: err.message,
        });
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(email, password)
      .then((res) => {
        const authToken = res.data.accessToken.split("Bearer ")[1];
        setCookie("accessToken", authToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.data.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          error: err.message,
        });
      });
  };

export const getUser = () => async (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });
  getUserRequest()
    .then((res) => {
      dispatch({
        type: USER_SUCCESS,
        user: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_FAILED,
        error: err.message,
      });
    });
};

export const refreshToken = () => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  });
  refreshTokenRequest()
    .then((res) => {
      const authToken = res.data.accessToken.split("Bearer ")[1];
      setCookie("accessToken", authToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      dispatch({
        type: REFRESH_TOKEN_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: REFRESH_TOKEN_FAILED,
        error: err.message,
      });
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  logoutRequest()
    .then(() => {
      setCookie("accessToken", "");
      localStorage.removeItem("refreshToken");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAILED,
        error: err.message,
      });
    });
};

export const updateUser = (name, email, password) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  updateUserRequest(name, email, password)
    .then((res) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_FAILED,
        error: err.message,
      });
    });
};

export const checkAuth = () => (dispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser()).finally(() => dispatch({ type: AUTH_CHECKED }));
  } else {
    dispatch({ type: AUTH_CHECKED });
  }
};

export const sendResetPassEmail = (email, history) => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });
  passwordResetEmailRequest(email)
    .then((res) => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        restoreEmail: res.data.success,
      });
      history.replace({ pathname: "/reset-password" });
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
        error: err.message,
      });
    });
};

export const resetPass = (password, token) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });
  passwordResetConfirmRequest(password, token)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        passRestore: res.data.success,
      });
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        error: err.message,
      });
    });
};
