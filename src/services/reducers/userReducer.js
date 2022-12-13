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
} from "../actions/user";

const initialState = {
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
  isAuthChecked: false,
};

export const userReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};
