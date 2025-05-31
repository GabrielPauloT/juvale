import { api } from "../api";


export function createAbsence(codeEmployee: string, absenceDate: string, certificateAbsence: boolean) {
  return api.post(`/absence`, {
    codeEmployee,
    absenceDate,
    certificateAbsence
  });
}