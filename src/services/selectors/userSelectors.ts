import { RootState } from "../../utils/types";

export const selectUser = (store: RootState) => store.user.data;
