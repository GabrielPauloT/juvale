import { ReactQueryKeysEnum } from "@/@types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserRequest } from "../requests";
import { createUserRequestType, findAllUserRequestType, updateUserRequestType } from "../types";

export function useUser(findAllUser: findAllUserRequestType) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.USER_FINDALL,
      findAllUser.page,
      findAllUser.perPage,
      findAllUser.name,
    ],
    queryFn: async () => {
      const { data } = await UserRequest.findAllUsuario(
        findAllUser.page,
        findAllUser.perPage,
        findAllUser.name
      );
      return data;
    },
  });
}

export function useDeleteUser() {
  const mutation = useMutation({
    mutationFn: (userId: number) => UserRequest.deleteUser(userId),
  });
  return mutation;
}

export function useUpdateUser() {
  const mutation = useMutation({
    mutationFn: ({
      id,
      userData,
    }: {
      id: number;
      userData: Partial<updateUserRequestType>;
    }) => UserRequest.updateUser(id, userData),
  });
  return mutation;
}

export function useCreateUser() {
  const mutation = useMutation({
    mutationFn: (userData: createUserRequestType) =>
      UserRequest.createUser(userData),
  });
  return mutation;
}