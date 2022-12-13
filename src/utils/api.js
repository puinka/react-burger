const BASE_API_URL = "https://norma.nomoreparties.space/api";
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDER_URL = `${BASE_API_URL}/orders`;
const LOGIN_URL = `${BASE_API_URL}/auth/login`;
const USER_URL = `${BASE_API_URL}/auth/user`;
const REGISTER_URL = `${BASE_API_URL}/auth/register`;
const PASSWORD_RESET_URL = `${BASE_API_URL}/password-reset/reset`;
const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
const TOKEN_URL = `${BASE_API_URL}/auth/token`;
const HEADERS = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getData = async () => {
  const res = await fetch(INGREDIENTS_URL);
  const { data } = await handleServerResponse(res);
  return data;
};

export const postOrder = async (ingredientsIDs) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      ingredients: ingredientsIDs,
    }),
  };
  const res = await fetch(ORDER_URL, settings);
  const order = await handleServerResponse(res);
  return order;
};

//COOKIES

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, props) => {
  props = { path: "/", ...props };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

// AUTH

export const registerRequest = async ({ name, email, password }) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password, name }),
  };
  const res = await fetch(REGISTER_URL, settings);
  return await handleServerResponse(res);
};

export const loginRequest = async ({ email, password }) => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password }),
  };
  const res = await fetch(LOGIN_URL, settings);
  return await handleServerResponse(res);
};

export const refreshTokenRequest = async () => {
  const settings = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  };

  const res = await fetch(TOKEN_URL, settings);
  return await handleServerResponse(res);
};

const fetchWithRefresh = async (url, settings) => {
  try {
    const res = await fetch(url, settings);
    await handleServerResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshTokenRequest();

      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.refreshToken);

      settings.headers.Authorization = refreshData.accessToken;

      const res = await fetch(url, settings);
      return await handleServerResponse(res);
    }
    return Promise.reject(err);
  }
};

export const getUserRequest = async () => {
  const settings = {
    headers: {
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  };
  const res = await fetch(USER_URL, settings);
  return await handleServerResponse(res);
  //return fetchWithRefresh(USER_URL, settings);
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
  const res = await fetch(LOGOUT_URL, settings);
  return await handleServerResponse(res);
};

export const updateUserRequest = async ({ name, email, password }) => {
  const settings = {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ name, email, password }),
  };
  const res = await fetch(USER_URL, settings);
  return await handleServerResponse(res);
};
