import { useMutation } from "@tanstack/react-query";
import { authRequestType } from "../types";
import { authRequest } from "../requests/AuthRequest";

export function useAuth() {
  const mutation = useMutation({
    mutationFn: (authData: authRequestType) => authRequest(authData),
  });
  return mutation;
}
