export const SET_INGREDIENT_MODAL = "SET_INGREDIENT_MODAL";
export const RESET_INGREDIENT_MODAL = "RESET_INGREDIENT_MODAL";

export const setIngredientModal = (item) => ({
  type: SET_INGREDIENT_MODAL,
  item: item,
});

export const resetIngredientModal = () => ({
  type: RESET_INGREDIENT_MODAL,
  item: null,
});
