import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState, thunkDispatch } from "./store";

const useAppDispatch = () => useDispatch<thunkDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
