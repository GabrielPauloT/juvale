export type findAllCompanyEmployeeCostRequestType = {
  date?: string;
};

export type FindCompanyEmployeeCostResponseType = {
  nameCompany: string;
  totalVT: number;
  totalVR: number;
  totalFuncionariosAtivos: number;
};

export type findAllCompanyResponseType = {
  id: number;
  name: string;
  created_at: string;
  last_modified: string | null;
};

export type findAllCompanyRequestType = {
  page: number;
  perPage: number;
  name?: string;
};

export type CreateCompanyRequestType = {
  name: string;
};
