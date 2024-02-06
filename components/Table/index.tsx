import { ColumnDef } from "@tanstack/react-table";
import React, { Dispatch, FC, SetStateAction } from "react";

type TableProps = {
  data: Api.Users.Data[];
  columns: ColumnDef<any, any>[];
  isFetching: boolean;
  headerComponent: JSX.Element;
  onClickRow: (cell: any, row: any) => void;
  pageCount: number;
  page: Dispatch<SetStateAction<number | undefined>>;
  search: Dispatch<SetStateAction<string | undefined>>;
  searchLabel: string;
};

const Table: FC<TableProps> = (props: TableProps) => {
  return <div>index</div>;
};

export default Table;
