import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import {
  findAllCompanyEmployeeCostRequestType,
  FindCompanyEmployeeCostResponseType,
} from "../types";

export function findAllCompanyEmployeeCost({
  date,
}: findAllCompanyEmployeeCostRequestType) {
  return api.get<ApiResult<FindCompanyEmployeeCostResponseType[]>>(
    `/company/employee/cost`,
    { params: { date: date } }
  );
}
