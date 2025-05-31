import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import {
  createUserRequestType,
  updateUserRequestType,
  UsuarioResponseType,
} from "../types/user";

export function findAllUsuario(page: number, perPage: number, name: string) {
  return api.get<ApiResult<UsuarioResponseType[]>>(`/user`, {
    params: { page: page, perPage: perPage, name: name },
  });
}

export function createUser(userData: createUserRequestType) {
  return api.post("/user", userData);
}

export function deleteUser(userId: number) {
  return api.delete(`/user/${userId}`);
}

export function updateUser(
  id: number,
  userData: Partial<updateUserRequestType>
) {
  return api.patch(`/user/${id}`, userData);
}
