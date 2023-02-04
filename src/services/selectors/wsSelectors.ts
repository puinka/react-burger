import { RootState } from "../../utils/types";

export const selectOrders = (store: RootState) => store.ws.orders;
export const selectWSdata = (store: RootState) => store.ws;
