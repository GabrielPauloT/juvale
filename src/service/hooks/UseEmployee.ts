import { ReactQueryKeysEnum } from "@/@types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EmployeerRequest } from "../requests";
import { findAllEmployeersRequestType } from "../types/employee";
import { deleteEmployee } from "../requests/EmployeeRequest";

export function UseEmployee(findAllEmployeers: findAllEmployeersRequestType) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.EMPLOYEE_FINDALL,
      findAllEmployeers.page,
      findAllEmployeers.perPage,
      findAllEmployeers.companyId,
      findAllEmployeers.name,
      findAllEmployeers.date
    ],
    queryFn: async () => {
      const { data } = await EmployeerRequest.findAllEmployeers(
        findAllEmployeers.page,
        findAllEmployeers.perPage,
        findAllEmployeers.companyId,
        findAllEmployeers.name,
        findAllEmployeers.date
      );
      return data;
    },
  });
}

export function useDeleteEmployee() {
  const mutation = useMutation({
    mutationFn: (codeEmployee: string) => deleteEmployee(codeEmployee),
  });
  return mutation;
}
