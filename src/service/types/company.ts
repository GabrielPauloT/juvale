export type findAllCompanyEmployeeCostRequestType = {
  date?: string;
};

export type FindCompanyEmployeeCostResponseType = {
  nameCompany: string;
  totalVT: number;
  totalVR: number;
  totalFuncionariosAtivos: number;
};
