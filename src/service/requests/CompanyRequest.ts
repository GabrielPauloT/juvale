import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import {
  CreateCompanyRequestType,
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
  perPage,
  name,
}: findAllCompanyRequestType) {
  return api.get<ApiResult<findAllCompanyResponseType[]>>(`/company`, {
    params: { page, perPage, name },
  });
}

export function createCompany(data: CreateCompanyRequestType) {
  return api.post("/company", data);
}

export function updateCompany(name: string, id: number) {
  return api.patch(`/company/${id}`, {
    name,
  });
}

export function deleteCompany(id: number) {
  return api.delete(`/company/${id}`);
}