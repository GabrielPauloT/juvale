export type EmployeeResponseType = {
  name: string;
  created_at: Date;
  last_modified: Date | null;
  code_employee: string;
  code_company: number;
  job_description: string;
  salary: number;
  enabled: boolean;
};

export type FindByCodeEmployeeAndDateResponseType = {
  employee: EmployeeResponseType;
  id: number;
  code_employee: string;
  absence_date: string;
  created_at: string;
  last_modified: string;
  certificate_absence: boolean;
};
