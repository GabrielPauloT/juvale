export type authRequestType = {
  email: string;
  password: string;
};

export type authResponseType = {
  message: string;
  statusCode: number;
  accessToken: string;
};
