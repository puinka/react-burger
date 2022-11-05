const BASE_API_URL = "https://norma.nomoreparties.space/api";
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;

const handleServerResponse = async (res) => {
  if (!res.ok) {
    const message = `Ошибка HTTP: ${res.status}`;
    throw new Error(message);
  }
  return res.json();
};

const getIngredients = async () => {
  const res = await fetch(INGREDIENTS_URL);
  const { data } = await handleServerResponse(res);
  return data;
};

export { getIngredients };
