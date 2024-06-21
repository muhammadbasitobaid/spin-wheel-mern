import { combineReducers } from "redux";

import userReducer from "./user";
import wheelReducer from "./wheel";

const buildRootReducer = () =>
  combineReducers({
    user: userReducer,
    wheel: wheelReducer
  });

export default buildRootReducer;
