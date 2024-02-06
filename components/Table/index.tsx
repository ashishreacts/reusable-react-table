import {
  Paper,
  TableContainer,
  Table as MUITable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
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

const columns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "gender", label: "Gender" },
  { id: "status", label: "Status" },
];

const rows = [
  { name: "Ashish", email: "aj@gmail.com", gender: "Male", status: "active" },
  { name: "Ashish", email: "aj@gmail.com", gender: "Male", status: "active" },
  { name: "Ashish", email: "aj@gmail.com", gender: "Male", status: "active" },
  { name: "Ashish", email: "aj@gmail.com", gender: "Male", status: "active" },
];
const Table: FC<TableProps> = (props: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <Typography component="h1" variant="h4">
            User Table
          </Typography>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;
