import { api } from "../api";

export function uploadPDF(pdf: File, companyId: string) {
  const formData = new FormData();
  formData.append("file", pdf);

  return api.post(`/pdf/upload?codeCompany=${companyId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function inactivePDF(pdf: File) {
  const formData = new FormData();
  formData.append("file", pdf);

  return api.post(`/pdf/upload/inactive`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}