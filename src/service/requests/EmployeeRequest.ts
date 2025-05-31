import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { EmployeeResponseType, updateEmployeeType } from "../types/employee";

export function findAllEmployeers(page: number, perPage: number, companyId: number| null, name: string, date: string) {
  return api.get<ApiResult<EmployeeResponseType[]>>(`/employee`, {
    params: { page: page, perPage: perPage, companyId: companyId, name: name, date: date },
  });
}

export function deleteEmployee(codeEmployee: string) {
  return api.delete(`/employee/${codeEmployee}`);
}

export function updateEmployee(codeEmployee: string, data: updateEmployeeType) {
  return api.patch(`/employee/${codeEmployee}`, {
    ...data
  });
}