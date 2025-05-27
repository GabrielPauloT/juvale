export type DataTableProps<T> = Readonly<{
  data: T[] | undefined;
  totalPages: number | undefined;
  page: number;
  hiddenFields?: (keyof T)[];
  onNextPageClick: () => void;
  onBackPageClick: () => void;
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  onViewClick?: (row: T) => void;
  onRelatorioClick?: (row: T) => void;
}>;
