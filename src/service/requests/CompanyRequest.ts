import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import {
  findAllCompanyEmployeeCostRequestType,
  findAllCompanyRequestType,
  findAllCompanyResponseType,
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

export function findAllCompany({
  page,
  perPage
}: findAllCompanyRequestType) {
  return api.get<ApiResult<findAllCompanyResponseType[]>>(
    `/company`,
    { params: { page, perPage } }
  );
}
