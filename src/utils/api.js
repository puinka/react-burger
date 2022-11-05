const BASE_API_URL = "https://norma.nomoreparties.space/api";
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDER_URL = `${BASE_API_URL}/orders`;

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

const postOrder = async (ingredientsIDs) => {
  const settings = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredientsIDs,
    }),
  };
  const res = await fetch(ORDER_URL, settings);
  const order = await handleServerResponse(res);
  return order;
};

export { getIngredients, postOrder };
