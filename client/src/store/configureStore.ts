import { legacy_createStore as createStore, applyMiddleware, compose, Store } from "redux";

import thunk from "redux-thunk";
import buildRootReducer from "./reducers/index";
import { UserState, initialState as user  } from "./reducers/user";
import { UserAction } from "./actions/user";

import { WheelState, initialState as wheel} from "./reducers/wheel";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

type AppState = { user: UserState, wheel: WheelState };

const initialState: AppState = {
  user,
  wheel
};

export default function configureStore(
  state: AppState = initialState
): Store<AppState, UserAction<any>> {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunk];

  return createStore(buildRootReducer(), state, composeEnhancers(applyMiddleware(...middlewares)));
}
