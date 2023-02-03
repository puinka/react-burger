import { RootState } from "../../utils/types";

export const selectOrders = (store: RootState) => store.ws.orders;
