/* eslint-disable @typescript-eslint/no-explicit-any */
export type DataTableProps = Readonly<{
  data: any[] | undefined;
  perPage: number;
  total: number | undefined;
  page: number;
  onNextPageClick: () => void;
  onBackPageClick: () => void;
  onEditClick?: (row: any) => void;
  onDeleteClick?: (row: any) => void;
  onViewClick?: (row: any) => void;
  onRelatorioClick?: (row: any) => void;
}>;
