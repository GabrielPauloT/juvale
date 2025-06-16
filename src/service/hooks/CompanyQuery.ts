import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";

import { CompanyRequest } from "../requests";
import {
  CreateCompanyRequestType,
  findAllCompanyEmployeeCostRequestType,
  findAllCompanyRequestType,
} from "../types";

export function useCompanyEemployeeCost(
  findAllCompanyEmployeeCostRequestType: findAllCompanyEmployeeCostRequestType
) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.COMPANY_FINDALL_EMPLOYEE_COST,
      findAllCompanyEmployeeCostRequestType,
    ],
    queryFn: async () => {
      const { data } = await CompanyRequest.findAllCompanyEmployeeCost(
        findAllCompanyEmployeeCostRequestType
      );
      return data;
    },
  });
}

export function useCompany(
  findAllCompanyRequestType: findAllCompanyRequestType
) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.USE_COMPANY_FIND_ALL,
      findAllCompanyRequestType.page,
      findAllCompanyRequestType.perPage,
      findAllCompanyRequestType.name,
    ],
    queryFn: async () => {
      const { data } = await CompanyRequest.findAllCompany(
        findAllCompanyRequestType
      );
      return data;
    },
  });
}

export function useCreateCompany() {
  const mutation = useMutation({
    mutationFn: (userData: CreateCompanyRequestType) =>
      CompanyRequest.createCompany(userData),
  });
  return mutation;
}

export function useEditCompany() {
  const mutation = useMutation({
    mutationFn: ({ name, id }: { name: string; id: number }) =>
      CompanyRequest.updateCompany(name, id),
  });
  return mutation;
}

export function useDeleteCompany() {
  const mutation = useMutation({
    mutationFn: (id: number) => CompanyRequest.deleteCompany(id),
  });
  return mutation;
}
