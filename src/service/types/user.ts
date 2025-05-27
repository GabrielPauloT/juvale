export type findAllUserRequestType = {
  page: number;
  perPage: number;
};

export type UsuarioResponseType = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};
