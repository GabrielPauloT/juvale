import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useQuery } from "@tanstack/react-query";

import { CompanyRequest } from "../requests";
import { findAllCompanyEmployeeCostRequestType, findAllCompanyRequestType } from "../types";

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
      findAllCompanyRequestType.perPage
    ],
    queryFn: async () => {
      const { data } = await CompanyRequest.findAllCompany(
        findAllCompanyRequestType      
      );
      return data;
    },
  });
}
