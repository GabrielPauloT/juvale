import { useMutation } from "@tanstack/react-query";
import { createAbsence } from "../requests/AbsenceRequest";

export function useCreateAbsence() {
  const mutation = useMutation({
    mutationFn: (
      {codeEmployee, 
      absenceDate, 
      certificateAbsence}: {codeEmployee: string, absenceDate: string, certificateAbsence: boolean }) => createAbsence(codeEmployee, absenceDate, certificateAbsence),
  });
  return mutation;
}