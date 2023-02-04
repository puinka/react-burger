import { useDispatch as dispatchHook } from "react-redux";
import { AppDispatch } from "../types";

export const useDispatch = () => dispatchHook<AppDispatch>();
