import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../actions/user";

const initialState = {
  user: { name: "", email: "" },
  isLoading: false,
  error: "",
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
