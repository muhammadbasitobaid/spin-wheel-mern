import { Dispatch } from "redux";
import { getUser, getWheels } from "../../api/index";
import { setUser, resetUser, setUserWheels } from "../actions/user";
import toast from "react-hot-toast";

export const attemptGetUser = () => (dispatch: Dispatch) =>
  getUser()
    .then((response) => {
      if (response.data.user) {
        dispatch(
          setUser({ ...response.data.user, id: response.data.user?._id })
        );
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });

export const fetchUserWheels = (userId: any) => (dispatch: Dispatch) => {
  // @ts-ignore
  return getWheels(userId)
    .then((response: any) => {
      console.log(response)
      // Transform API response into the expected WheelState structure

      // Dispatch the transformed wheels to the state
      dispatch(setUserWheels(response.data.wheels));
    })
    .catch((error) => {
      console.log('error: ', error)
      toast.error("Failed to get user wheels");
    });
};
