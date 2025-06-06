export type findAllEmployeersRequestType = {
    page: number,
    perPage: number,
    companyId: number | null,
    date: string,
    name: string,
};

type reponseCompany = {
    id: number,
    name: string,
    created_at: string,
    last_modified: string | null
}

export type reponseTicket = {
		id: number,
		code_employee: string,
		value: string,
		created_at: string,
		last_modified: string | null
}

type reponseSnack = {
		id: number,
		code_employee: string,
		value: string,
		created_at: string,
		last_modified: string | null
}

type reponseAbsence = {
	  id: number;
    absence_date: Date;
    certificate_absence: boolean; 
}

export type EmployeeResponseType = {
  codeEmployee: string,
	codeCompany: number,
	name: string,
	jobDescription: string,
	salary: string | number,
	vrTotal: number,
	vrPerDay: number | undefined,
	vtTotal: number,
	vtPerDay: number,
	enabled: boolean,
	ticket: reponseTicket[],
	snack: reponseSnack[],
	absence: reponseAbsence[],
	company: reponseCompany
};

export type updateEmployeeType = {
	codeCompany: number | null,
    name: string | undefined,
    jobDescription: string | undefined,
    salary: string | number | undefined
	snackValue: number | undefined
}
