import { JSX, SetStateAction } from "react";

export type DataTableProps<T> = Readonly<{
  data: T[] | undefined;
  totalPages: number | undefined;
  page: number;
  hiddenFields?: (keyof T | string)[];
  onlyFields?: (keyof T | string)[];
  columnLabels?: Record<string, string>;
  customRender?: Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any, row: T) => string | number | JSX.Element
  >;
  onNextPageClick?: () => void;
  onBackPageClick?: () => void;
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  onViewClick?: (row: T) => void;
  onRelatorioClick?: (row: T) => void;
  onAddAbsentClick?: (row: T) => void;
  onAddTicketClick?: (row: T) => void;
  searchValue?: string;
  onChangeSearchValue?: (input: {
    target: { value: SetStateAction<string> };
  }) => void;
}>;
