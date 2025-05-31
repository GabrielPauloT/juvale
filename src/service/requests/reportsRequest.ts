import { api } from "../api";

export function reportsCompany(date: string, nameReports: string) {
  return api
    .get(`/pdf/report/company?date:${date}`, {
      responseType: "blob",
    })
    .then((response) => {
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = document.createElement("a");
      fileURL.href = URL.createObjectURL(file);
      fileURL.setAttribute("download", `${nameReports}.pdf`);
      document.body.appendChild(fileURL);
      fileURL.click();
    });
}

export function reportsCompanyEmployee(date: string, nameReports: string) {
  return api
    .get(`/pdf/report/employees?date:${date}`, {
      responseType: "blob",
    })
    .then((response) => {
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = document.createElement("a");
      fileURL.href = URL.createObjectURL(file);
      fileURL.setAttribute("download", `${nameReports}.pdf`);
      document.body.appendChild(fileURL);
      fileURL.click();
    });
}

export function reportsCompanyEmployeeWithAbsences(
  date: string,
  nameReports: string
) {
  return api
    .get(`/pdf/report/employees/absences?date:${date}`, {
      responseType: "blob",
    })
    .then((response) => {
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = document.createElement("a");
      fileURL.href = URL.createObjectURL(file);
      fileURL.setAttribute("download", `${nameReports}.pdf`);
      document.body.appendChild(fileURL);
      fileURL.click();
    });
}
