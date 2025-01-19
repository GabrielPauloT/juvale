import { Dispatch, SetStateAction } from "react";

export type ToastStateType = {
  message: string;
  type: "success" | "error";
};

export type ToastProps = {
  message: string;
  type: "success" | "error";
  isClose: Dispatch<SetStateAction<ToastStateType | undefined>>;
};
