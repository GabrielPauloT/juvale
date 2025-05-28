import { api } from "../api";
import { authRequestType } from "../types";

export function authRequest(authData: authRequestType) {
  return api.post("/auth", {
    email: authData.email,
    password: authData.password,
  });
}
