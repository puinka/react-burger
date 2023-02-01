import { TUser } from "../../utils/types";
import { TUserActions } from "../actions/user";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  AUTH_CHECKED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "../constants/user";

type TInitialState = {
  data: null | TUser;
  registerUserRequest: boolean;
  registerUserError: null | string;
  loginUserRequest: boolean;
  loginUserError: null | string;
  getUserRequest: boolean;
  getUserError: null | string;
  refreshTokenRequest: boolean;
  refreshTokenError: null | string;
  updateUserRequest: boolean;
  updateUserError: null | string;
  logoutRequest: boolean;
  logoutError: null | string;
  forgotPasswordRequest: boolean;
  forgotPasswordError: null | string;
  restoreEmail: boolean;
  isAuthChecked: boolean;
};

const initialState: TInitialState = {
  data: null,
  registerUserRequest: false,
  registerUserError: null,
  loginUserRequest: false,
  loginUserError: null,
  getUserRequest: false,
  getUserError: null,
  refreshTokenRequest: false,
  refreshTokenError: null,
  updateUserRequest: false,
  updateUserError: null,
  logoutRequest: false,
  logoutError: null,
  forgotPasswordRequest: false,
  forgotPasswordError: null,
  restoreEmail: false,
  isAuthChecked: false,
};

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registerUserRequest: true,
        isAuthChecked: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: null,
        data: action.user,
        isAuthChecked: true,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: action.error,
        isAuthChecked: true,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loginUserRequest: true,
        isAuthChecked: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: null,
        data: action.user,
        isAuthChecked: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: action.error,
        isAuthChecked: true,
      };
    case USER_REQUEST:
      return {
        ...state,
        getUserRequest: true,
        isAuthChecked: false,
      };
    case USER_SUCCESS:
      return {
        ...state,
        getUserRequest: false,
        getUserError: null,
        data: action.user,
        isAuthChecked: true,
      };
    case USER_FAILED:
      return {
        ...state,
        getUserRequest: false,
        getUserError: action.error,
        isAuthChecked: true,
      };
    case REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        refreshTokenRequest: true,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenError: null,
      };
    case REFRESH_TOKEN_FAILED:
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenError: action.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutRequest: true,
        isAuthChecked: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutRequest: false,
        logoutError: null,
        data: null,
        isAuthChecked: true,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        logoutRequest: false,
        logoutError: action.error,
        isAuthChecked: true,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updateUserRequest: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: null,
        data: action.user,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: action.error,
      };

    case AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: null,
        restoreEmail: true,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: action.error,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPasswordRequest: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: null,
        restoreEmail: false,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: action.error,
      };

    default:
      return state;
  }
};
