import { SetStateAction } from "react";

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
  onAddAbsentClick?: (row: T) => void;
  onAddTicketClick?: (row: T) => void;
  searchValue?: string;
  onChangeSearchValue?: (input: { target: { value: SetStateAction<string>; }; }) => void;
}>;
