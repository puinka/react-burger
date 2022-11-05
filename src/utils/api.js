const BASE_API_URL = "https://norma.nomoreparties.space/api";
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;

const handleServerRequest = async () => {
  const res = await fetch(INGREDIENTS_URL);
  if (!res.ok) {
    const message = `Ошибка HTTP: ${res.status}`;
    throw new Error(message);
  }
  return res.json();
};

export { handleServerRequest };
