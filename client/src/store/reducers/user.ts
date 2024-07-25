import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER,
  RESET_USER,
  SET_USER_WHEELS,
  UserAction,
  User,
} from "../actions/user";

export type UserState = {
  isAuth: boolean;
  user: User | null;
};

export const initialState: UserState = {
  isAuth: false,
  user: null,
};

export default function user(
  state = initialState,
  action: UserAction<any>
): UserState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case RESET_USER:
      return initialState;
    case SET_USER_WHEELS:
      return {
        ...state,
        user: state.user
          ? { ...state.user, wheels: action.payload }
          : state.user,
      };
    default:
      return state;
  }
}
