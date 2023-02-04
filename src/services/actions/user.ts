import { History } from "history";
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
import {
  AUTH_CHECKED,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
} from "../constants/user";
import { AppDispatch, AppThunk, TInputValues, TUser } from "../../utils/types";

interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: TUser;
}

interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
  readonly error: string;
}

interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}

interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
  readonly error: string;
}

interface IGetUserRequestAction {
  readonly type: typeof USER_REQUEST;
}

interface IGetUserSuccessAction {
  readonly type: typeof USER_SUCCESS;
  readonly user: TUser;
}

interface IGetUserFailedAction {
  readonly type: typeof USER_FAILED;
  readonly error: string;
}

interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
  readonly error: string;
}

interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
  readonly error: string;
}

interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  user: TUser;
}

interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly error: string;
}

interface ICheckAuthAction {
  readonly type: typeof AUTH_CHECKED;
}

interface ISendResetPassRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface ISendResetPassSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  restoreEmail: boolean;
}

interface ISendResetPassFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly error: string;
}

interface IResetPassRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPassSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

interface IResetPassFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly error: string;
}

export type TUserActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | ICheckAuthAction
  | ISendResetPassRequestAction
  | ISendResetPassSuccessAction
  | ISendResetPassFailedAction
  | IResetPassRequestAction
  | IResetPassSuccessAction
  | IResetPassFailedAction;

//actions
export const register =
  ({ name, email, password }: TInputValues) =>
  (dispatch: AppDispatch) => {
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
  ({ email, password }: TInputValues) =>
  (dispatch: AppDispatch) => {
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

export const getUser = () => async (dispatch: AppDispatch) => {
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

export const refreshToken = () => (dispatch: AppDispatch) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  });
  refreshTokenRequest()
    .then((res) => {
      // const authToken = res.data.accessToken.split("Bearer ")[1];
      // setCookie("accessToken", authToken);
      // localStorage.setItem("refreshToken", res.data.refreshToken);
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

export const logout = () => (dispatch: AppDispatch) => {
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

export const updateUser =
  (name: string, email: string, password: string) =>
  (dispatch: AppDispatch) => {
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

export const checkAuth = () => (dispatch: AppDispatch) => {
  if (getCookie("accessToken")) {
    dispatch(getUser()).finally(() => dispatch({ type: AUTH_CHECKED }));
  } else {
    dispatch({ type: AUTH_CHECKED });
  }
};

export const sendResetPassEmail =
  (email: string, history: History) => (dispatch: AppDispatch) => {
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

export const resetPass =
  (password: string, token: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    passwordResetConfirmRequest(password, token)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          error: err.message,
        });
      });
  };
