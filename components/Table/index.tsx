import {
  Box,
  Button,
  Grid,
  Table as MUITable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Dispatch, FC, SetStateAction, useMemo } from "react";

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

const col = [
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
  const { headerComponent, columns, data } = props;
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoisedHeaderComponent = useMemo(
    () => headerComponent,
    [headerComponent]
  );

  const { getHeaderGroups, getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <TableContainer component={Paper}>
      <Box padding="1rem">
        {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="search"
            size="small"
            placeholder="search by name"
            variant="standard"
            sx={{ p: 2 }}
          />
        </Grid>
      </Grid>
      <MUITable>
        <TableHead>
          <TableRow>
            {memoizedColumns.map((column) => (
              <TableCell key={column.id}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {getRowModel().rows.map((row, index) => (
            <TableRow key={index}>
              {col.map((column) => (
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
