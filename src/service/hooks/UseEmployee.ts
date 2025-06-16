import { ReactQueryKeysEnum } from "@/@types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EmployeerRequest } from "../requests";
import {
  CreateEmployeeType,
  FindAllEmployeersRequestType,
  UpdateEmployeeType,
} from "../types/employee";
import { deleteEmployee, updateEmployee } from "../requests/EmployeeRequest";

export function UseEmployee(findAllEmployeers: FindAllEmployeersRequestType) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.EMPLOYEE_FINDALL,
      findAllEmployeers.page,
      findAllEmployeers.perPage,
      findAllEmployeers.companyId,
      findAllEmployeers.name,
      findAllEmployeers.date,
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

export function useEditEmployee() {
  const mutation = useMutation({
    mutationFn: ({
      codeEmployee,
      data,
    }: {
      codeEmployee: string;
      data: UpdateEmployeeType;
    }) => updateEmployee(codeEmployee, data),
  });
  return mutation;
}

export function useCreateEmployee() {
  const mutation = useMutation({
    mutationFn: ({ data }: { data: CreateEmployeeType }) =>
      EmployeerRequest.createEmployee(data),
  });
  return mutation;
}
