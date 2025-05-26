import { ReactQueryKeysEnum } from "@/@types/enums/reactQuery";
import { useQuery } from "@tanstack/react-query";

import { CompanyRequest } from "../requests";
import { findAllCompanyEmployeeCostRequestType } from "../types";

export function useCompany(
  findAllCompanyEmployeeCostRequestType: findAllCompanyEmployeeCostRequestType
) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.COMPANY_FINDALL,
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
