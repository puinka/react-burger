import axios from "axios";
import { setCookie, getCookie } from "./cookie";

const BASE_API_URL = "https://norma.nomoreparties.space/api";
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDER_URL = `${BASE_API_URL}/orders`;
const LOGIN_URL = `${BASE_API_URL}/auth/login`;
const USER_URL = `${BASE_API_URL}/auth/user`;
const REGISTER_URL = `${BASE_API_URL}/auth/register`;
const PASSWORD_RESET_EMAIL_URL = `${BASE_API_URL}/password-reset`;
const PASSWORD_RESET_CONFIRM_URL = `${BASE_API_URL}/password-reset/reset`;
const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
const TOKEN_URL = `${BASE_API_URL}/auth/token`;
const HEADERS = { "Content-Type": "application/json" };

export const request = async (url, options) => {
  return await axios(url, options);
};

export const getData = async () => {
  return request(INGREDIENTS_URL, {});
};

export const postOrder = async (ingredientsIDs) => {
  const settings = {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    data: JSON.stringify({
      ingredients: ingredientsIDs,
    }),
  };
  return request(ORDER_URL, settings);
};

// AUTH

export const registerRequest = async (name, email, password) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    data: JSON.stringify({ email, password, name }),
  };
  return request(REGISTER_URL, settings);
};

export const loginRequest = async (email, password) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    data: JSON.stringify({ email, password }),
  };
  return request(LOGIN_URL, settings);
};

export const refreshTokenRequest = async () => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    data: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  };

  request(TOKEN_URL, settings).then((refreshData) => {
    if (!refreshData.data.success) {
      Promise.reject(refreshData);
    }

    localStorage.setItem("refreshToken", refreshData.data.refreshToken);
    setCookie("accessToken", refreshData.data.accessToken.split("Bearer ")[1]);
  });
};

const fetchWithRefresh = async (url, settings) => {
  try {
    return await request(url, settings);
  } catch (err) {
    console.log(err.response.data.message);
    if (err.response.data.message === "jwt expired") {
      const refreshData = await refreshTokenRequest();

      if (!refreshData.data.success) {
        Promise.reject(refreshData);
      }

      settings.headers.Authorization = refreshData.accessToken;

      request(url, settings);
    }
    return Promise.reject(err);
  }
};

export const getUserRequest = async () => {
  const settings = {
    headers: {
      "content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  };
  return fetchWithRefresh(USER_URL, settings);
};

export const logoutRequest = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      token: refreshToken,
    }),
  };
  return request(LOGOUT_URL, settings);
};

export const updateUserRequest = async (name, email, password) => {
  const settings = {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ name, email, password }),
  };
  return request(USER_URL, settings);
};

export const passwordResetEmailRequest = async (email) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email }),
  };
  return request(PASSWORD_RESET_EMAIL_URL, settings);
};

export const passwordResetConfirmRequest = async (password, code) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ password, code }),
  };
  return request(PASSWORD_RESET_CONFIRM_URL, settings);
};
