import axios, { AxiosResponse } from "axios";
import {
  HEADERS,
  INGREDIENTS_URL,
  LOGIN_URL,
  LOGOUT_URL,
  ORDER_URL,
  PASSWORD_RESET_CONFIRM_URL,
  PASSWORD_RESET_EMAIL_URL,
  REGISTER_URL,
  TOKEN_URL,
  USER_URL,
} from "./constants";
import { setCookie, getCookie } from "./cookie";
import {
  TErrorResponse,
  TIngredientsResponse,
  TLoginResponse,
  TLogoutResponse,
  TOrderResponse,
  TPasswordResetConfirm,
  TPasswordResetEmail,
  TRegisterResponse,
  TTokenRefreshResponse,
  TUpdateUserResponse,
} from "./types";

export const request = async <T>(url: string, options?: any): Promise<T> => {
  return await axios(url, options);
};

export const getData = async () => {
  return request<TIngredientsResponse>(INGREDIENTS_URL, {});
};

export const postOrder = async (ingredientsIDs: string[]) => {
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
  return request<TOrderResponse>(ORDER_URL, settings);
};

// AUTH

export const registerRequest = async (
  name: string,
  email: string,
  password: string
) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    data: JSON.stringify({ email, password, name }),
  };
  const thing = request(REGISTER_URL, settings);
  console.log(thing);

  return request<TRegisterResponse>(REGISTER_URL, settings);
};

export const loginRequest = async (email: string, password: string) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    data: JSON.stringify({ email, password }),
  };
  return request<TLoginResponse>(LOGIN_URL, settings);
};

export const refreshTokenRequest = async () => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    data: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  };

  return request<TTokenRefreshResponse>(TOKEN_URL, settings);
  // .then((refreshData) => {
  //   if (!refreshData.data.success) {
  //     Promise.reject(refreshData);
  //   }

  // localStorage.setItem("refreshToken", refreshData.data.refreshToken);
  // setCookie("accessToken", refreshData.data.accessToken.split("Bearer ")[1]);
  //});
};

const fetchWithRefresh = async (url: string, settings?: any) => {
  try {
    return await request<TTokenRefreshResponse>(url, settings);
  } catch (err: any) {
    console.log(err.response.data.message);
    if (err.response.data.message === "jwt expired") {
      const refreshData = await refreshTokenRequest().then((refreshData) => {
        if (!refreshData.data.success) {
          Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.data.refreshToken);
        setCookie(
          "accessToken",
          refreshData.data.accessToken.split("Bearer ")[1]
        );

        settings.headers.Authorization = refreshData.data.accessToken;
        return request(url, settings);
      });
    }
    return Promise.reject(err);
  }
};

//   localStorage.setItem("refreshToken", refreshData.data.refreshToken);
// setCookie("accessToken", refreshData.data.accessToken.split("Bearer ")[1]);

// settings.headers.Authorization = refreshData.data.accessToken;
//   request(url, settings);

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

  return request<TLogoutResponse>(LOGOUT_URL, settings);
};

export const updateUserRequest = async (
  name: string,
  email: string,
  password: string
) => {
  const settings = {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ name, email, password }),
  };
  return request<TUpdateUserResponse>(USER_URL, settings);
};

export const passwordResetEmailRequest = async (email: string) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email }),
  };
  return request<TPasswordResetEmail>(PASSWORD_RESET_EMAIL_URL, settings);
};

export const passwordResetConfirmRequest = async (
  password: string,
  code: string
) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ password, code }),
  };
  return request<TPasswordResetConfirm>(PASSWORD_RESET_CONFIRM_URL, settings);
};
