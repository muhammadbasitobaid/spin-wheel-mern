import { ThunkDispatch } from "redux-thunk";
import { UserAction } from "./actions/user";
import configureStore from "./configureStore";

const store = configureStore();

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
export type thunkDispatch = ThunkDispatch<RootState, any, UserAction<any>>;

export { store };
