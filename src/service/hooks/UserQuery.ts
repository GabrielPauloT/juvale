import { ReactQueryKeysEnum } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import { UserRequest } from "../requests";
import { findAllUserRequestType } from "../types";

export function useUser(findAllUser: findAllUserRequestType) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.USER_FINDALL,
      findAllUser.page,
      findAllUser.perPage,
    ],
    queryFn: async () => {
      const { data } = await UserRequest.findAllUsuario(
        findAllUser.page,
        findAllUser.perPage
      );
      return data;
    },
  });
}
