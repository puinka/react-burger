import { RootState } from "../../utils/types";

export const selectIsLoading = (store: RootState) => store.ingredients;
export const selectIngredients = (store: RootState) =>
  store.ingredients.ingredients;
