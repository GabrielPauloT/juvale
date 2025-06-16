import { ApiResult } from "@/@types/API/ApiResult";
import { api } from "../api";
import { FindByCodeEmployeeAndDateResponseType } from "../types/absence";

export function createAbsence(
  codeEmployee: string,
  absenceDate: string,
  certificateAbsence: boolean
) {
  return api.post(`/absence`, {
    codeEmployee,
    absenceDate,
    certificateAbsence,
  });
}

export function findByCodeEmployeeAndDate(codeEmployee: string, date: string) {
  return api.get<ApiResult<FindByCodeEmployeeAndDateResponseType[]>>(
    `absence/code_employee/${codeEmployee}/date/${date}`
  );
}

export function deleteAbsence(codeEmployee: number) {
  return api.delete(`/absence/${codeEmployee}`);
}
