import { login, logout, User } from "../actions/user";
import { Dispatch } from "redux";
import { Credentials } from "src/store/actions/user";

import {
  postUser,
  postLogin,
  postLogout,
  getConfirmation,
  resendConfirmation,
  resetRegister,
  sendResetPasswordLink,
  resetPassword,
} from "../../api/index";
import { NavigateFunction } from "react-router";
import toast from "react-hot-toast";

export const attemptLogin =
  (credentials: Credentials, navigate: NavigateFunction) =>
  (dispatch: Dispatch) =>
    postLogin(credentials).then(({ data }) => {
      dispatch(login(data.user));
      toast.success("Login successful");
      navigate("/home", { replace: true });
    });

export const attemptSendResetPasswordLink = (
  email: string,
  navigate: NavigateFunction
) =>
  sendResetPasswordLink(email).then(() => {
    navigate("/login/forgot", { replace: true });
  });

export const attemptResetPassword = (
  password: string,
  token: string,
  navigate: NavigateFunction
) =>
  resetPassword(password, token)
    .then(() => {
      navigate("/login", { replace: true });
    })
    .catch(() => {
      navigate(`/login/reset/${token}`, { replace: true });
    });

export const attemptLogout =
  (navigate: NavigateFunction) => (dispatch: Dispatch) =>
    postLogout()
      .then(() => {
        dispatch(logout());
      })
      .finally(() => {
        navigate("/login", { replace: true });
      });

export const attemptRegister = (newUser: User) => (dispatch: Dispatch) => {
  return postUser(newUser)
    .then(() => {
      toast.success(
        "Verification Email has been sent. Please check your inbox."
      );
    })
    .catch((error) => {
      toast.error(
        `Registration failed: ${error.response?.data?.message || error.message}`
      );
    });
};

export const attemptGetConfirmation =
  (token: string, navigate: NavigateFunction) => (dispatch: Dispatch) =>
    getConfirmation(token).then(() => {
      navigate("/", { replace: true });
    });

export const attemptResendConfirmation =
  (email: string, navigate: NavigateFunction) => (dispatch: Dispatch) =>
    resendConfirmation(email).catch(() => {
      navigate("/register", { replace: true });
    });

export const attemptResetRegister =
  (email: string, navigate: NavigateFunction) => (dispatch: Dispatch) =>
    resetRegister(email).catch(() => {
      navigate("/register", { replace: true });
    });
