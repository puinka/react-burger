export const INGREDIENT_TYPES = {
  BUN: "bun",
  MAIN: "main",
  SAUCE: "sauce",
};

export const BASE_API_URL = "https://norma.nomoreparties.space/api";
export const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
export const ORDER_URL = `${BASE_API_URL}/orders`;
export const LOGIN_URL = `${BASE_API_URL}/auth/login`;
export const USER_URL = `${BASE_API_URL}/auth/user`;
export const REGISTER_URL = `${BASE_API_URL}/auth/register`;
export const PASSWORD_RESET_EMAIL_URL = `${BASE_API_URL}/password-reset`;
export const PASSWORD_RESET_CONFIRM_URL = `${BASE_API_URL}/password-reset/reset`;
export const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
export const TOKEN_URL = `${BASE_API_URL}/auth/token`;

export const HEADERS = { "Content-Type": "application/json" };

export const wsUrlAll = "wss://norma.nomoreparties.space/orders/all";
export const wsUrl = "wss://norma.nomoreparties.space/orders";
