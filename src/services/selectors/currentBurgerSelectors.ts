import { RootState } from "../../utils/types";

export const selectBun = (store: RootState) => store.currentBurger.bun;
export const selectMains = (store: RootState) => store.currentBurger.mains;
