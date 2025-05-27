import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { UsuarioResponseType } from "../types/user";

export function findAllUsuario(page: number, perPage: number) {
  return api.get<ApiResult<UsuarioResponseType[]>>(`/user`, {
    params: { page: page, perPage: perPage },
  });
}

// export function createTipoSala(tipoSalaData: CreateTipoSalaType) {
//   return api.post("/tipossalas", tipoSalaData);
// }

// export function deleteTipoSala(salaId: number) {
//   return api.delete(`/tipossalas/${salaId}`);
// }

// export function updateTipoSala(
//   tipoSalaId: number,
//   tipoSalaData: Partial<CreateTipoSalaType>
// ) {
//   return api.patch(`/tipossalas/${tipoSalaId}`, tipoSalaData);
// }
