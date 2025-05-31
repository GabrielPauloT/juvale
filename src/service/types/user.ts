export type findAllUserRequestType = {
  page: number;
  perPage: number;
  name: string;
};

export type UsuarioResponseType = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};

export type roleUser = "admin" | "user";

export type updateUserRequestType = {
  name: string;
  email: string;
  password: string;
  role: roleUser;
};

export type createUserRequestType = {
  name: string;
  email: string;
  password: string;
  role: roleUser;
};
