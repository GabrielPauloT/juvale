export type ApiResult<t> = {
  data: t;
  statusCode: number;
  totalRecords?: number;
  totalPages?: number;
  message?: string;
  page?: number;
  perPage?: number;
};
