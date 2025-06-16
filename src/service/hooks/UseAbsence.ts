import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactQueryKeysEnum } from "@/@types";
import { AbsenceRequest } from "../requests";

export function useCreateAbsence() {
  const mutation = useMutation({
    mutationFn: ({
      codeEmployee,
      absenceDate,
      certificateAbsence,
    }: {
      codeEmployee: string;
      absenceDate: string;
      certificateAbsence: boolean;
    }) =>
      AbsenceRequest.createAbsence(
        codeEmployee,
        absenceDate,
        certificateAbsence
      ),
  });
  return mutation;
}

export function UsefindByCodeEmployeeAndDate(
  codeEmployee: string,
  date: string
) {
  return useQuery({
    queryKey: [
      ReactQueryKeysEnum.FIND_BY_CODE_EMPLOYEE_AND_DATE,
      codeEmployee,
      date,
    ],
    queryFn: async () => {
      const { data } = await AbsenceRequest.findByCodeEmployeeAndDate(
        codeEmployee,
        date
      );
      return data;
    },
    enabled: !!codeEmployee,
  });
}

export function useDeleteAbsence() {
  const mutation = useMutation({
    mutationFn: (codeEmployee: number) =>
      AbsenceRequest.deleteAbsence(codeEmployee),
  });
  return mutation;
}
