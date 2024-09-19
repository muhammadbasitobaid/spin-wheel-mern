import { WheelState } from "src/store/reducers/wheel"

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_USER = "SET_USER";
export const SET_USER_WHEELS = "SET_USER_WHEELS";
export const RESET_USER = "RESET_USER";

export type User = {
  id?: string;
  _id?: string;
  username: string;
  email: string;
  password: string;
  wheels?: WheelState[];
};

export type Credentials = {
  username: string;
  password: string;
};

export type UserAction<T> = {
  type: string;
  payload?: T;
};

export function login(credentials: Credentials): UserAction<Credentials> {
  return {
    type: LOGIN_USER,
    payload: credentials,
  };
}

export function logout(): UserAction<never> {
  return {
    type: LOGOUT_USER,
  };
}

export function setUser(user: User): UserAction<User> {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function resetUser(): UserAction<never> {
  return { type: RESET_USER };
}

export function setUserWheels(wheels: WheelState[]): UserAction<WheelState[]> {
  return { type: SET_USER_WHEELS, payload: wheels };
}
