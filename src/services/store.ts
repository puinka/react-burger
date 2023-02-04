import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { wsActions } from "./actions/wsActionTypes";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./socketMiddleware/socketMiddleware";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);
