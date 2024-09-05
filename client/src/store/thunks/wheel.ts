import { Dispatch } from "redux";
import http from "src/services/httpService";
import { setSelectedWheel } from "../actions/wheel";
import { WheelState } from "../reducers/wheel";
import { postWheel } from "../../api";
import toast from "react-hot-toast";

export const fetchWheelById =
  (wheelId: string) => async (dispatch: Dispatch) => {
    try {
      const response = await http.get(
        `${process.env.REACT_APP_API_URL}/api/wheels/${wheelId}`
      );
      dispatch(setSelectedWheel({ ...response.data }));
    } catch (error) {
      console.error("Failed to fetch wheel details", error);
      toast.error("Failed to fetch wheel details");
    }
  };

export const attemptSaveWheel = (wheel: WheelState, id: string) => () =>
  postWheel(wheel, id)
    .then((data) => {
      toast.success("Wheel created successfully");
      return data;
    })
    .catch(() => toast.error("Wheel creation failed"));

