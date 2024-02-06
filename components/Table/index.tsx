import {
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
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, FC, SetStateAction } from "react";

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
      <Grid container spacing={2} sx={{ p: 1 }}>
        <Grid item xs={10}>
          <Typography component="h1" variant="h4">
            User Table
          </Typography>
        </Grid>
        <Grid item xs={2} >
          <Button>Action Button</Button>
        </Grid>
      </Grid>
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
