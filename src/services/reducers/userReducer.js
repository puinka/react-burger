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
} from "../actions/user";

const initialState = {
  data: null,
  registerUserRequest: false,
  registerUserError: null,
  loginUserRequest: false,
  loginUserError: null,
  getUserRequest: false,
  getUserError: null,
  updateUserRequest: false,
  updateUserError: null,
  isAuthChecked: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registerUserRequest: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: null,
        data: action.user,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: action.error,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loginUserRequest: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: null,
        data: action.user,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: action.error,
      };
    case USER_REQUEST:
      return {
        ...state,
        getUserRequest: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        getUserRequest: false,
        getUserError: null,
        data: action.user,
      };
    case USER_FAILED:
      return {
        ...state,
        getUserRequest: false,
        getUserError: action.error,
      };
    default:
      return state;
  }
};
