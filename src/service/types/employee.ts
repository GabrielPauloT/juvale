export type FindAllEmployeersRequestType = {
  page: number;
  perPage: number;
  companyId: number | null;
  date: string;
  name: string;
};

type ReponseCompany = {
  id: number;
  name: string;
  created_at: string;
  last_modified: string | null;
};

export type ReponseTicket = {
  id: number;
  code_employee: string;
  value: string;
  created_at: string;
  last_modified: string | null;
};

type ReponseSnack = {
  id: number;
  code_employee: string;
  value: string;
  created_at: string;
  last_modified: string | null;
};

type ReponseAbsence = {
  id: number;
  absence_date: Date;
  certificate_absence: boolean;
};

export type EmployeeResponseType = {
  codeEmployee: string;
  codeCompany: number;
  name: string;
  jobDescription: string;
  salary: string | number;
  vrTotal: number;
  vrPerDay: number | undefined;
  vtTotal: number;
  vtPerDay: number;
  enabled: boolean;
  ticket: ReponseTicket[];
  snack: ReponseSnack[];
  absence: ReponseAbsence[];
  company: ReponseCompany;
};

export type UpdateEmployeeType = {
  codeCompany: number | null;
  name: string | undefined;
  jobDescription: string | undefined;
  salary: string | number | undefined;
  snackValue: number | undefined;
};

export type CreateEmployeeType = {
  codeEmployee: string;
  codeCompany: number | null;
  name: string;
  jobDescription: string;
  salary: string | number | undefined;
  snackValue: number;
};
