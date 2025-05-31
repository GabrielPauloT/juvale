import { useMutation } from "@tanstack/react-query";
import { inactivePDF, uploadPDF } from "../requests/PdfRequest";

export function useUploadPDF() {
  const mutation = useMutation({
    mutationFn: ({pdf, companyId}: {pdf: File, companyId: string}) => uploadPDF(pdf, companyId),
  });
  return mutation;
}

export function useInactivePDF() {
  const mutation = useMutation({
    mutationFn: (pdf: File) => inactivePDF(pdf),
  });
  return mutation;
}