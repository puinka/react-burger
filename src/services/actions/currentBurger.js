import { v4 as uuidv4 } from "uuid";

export const ADD_BUN = "ADD_BUN";
export const ADD_MAIN = "ADD_MAIN";
export const DELETE_MAIN = "DELETE_MAIN";

export const addBun = (item) => ({ type: ADD_BUN, item: item });
export const addMain = (item) => ({
  type: ADD_MAIN,
  item: item,
  currentID: uuidv4(),
});
export const deleteMain = (id) => ({ type: DELETE_MAIN, currentID: id });
