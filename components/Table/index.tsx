import {
  Box,
  Button,
  Grid,
  Table as MUITable,
  Paper,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { debounce } from "lodash";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { StyledPagination } from "./styled";

type TableProps = {
  data: Api.Users.Data[];
  columns: ColumnDef<any, any>[];
  isFetching: boolean;
  headerComponent: JSX.Element;
  onClickRow: (cell: any, row: any) => void;
  pageCount: number;
  page?: Dispatch<SetStateAction<number | undefined>>;
  search?: Dispatch<SetStateAction<string | undefined>>;
  searchLabel?: string;
  skeletonCount?: number;
  skeletonHeight?:number;
};

const Table: FC<TableProps> = (props: TableProps) => {
  const {
    headerComponent,
    columns,
    data,
    search,
    searchLabel = "Search",
    pageCount,
    page,
    onClickRow,
    skeletonCount,
    skeletonHeight,
    isFetching,
  } = props;
  const [paginationPage, setPaginationPage] = useState(1);

  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoisedHeaderComponent = useMemo(
    () => headerComponent,
    [headerComponent]
  );

  const { getRowModel, getAllColumns } = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
  });

  const skeletons = Array.from({ length: skeletonCount }, (x, i) => i);
  const columnCount = getAllColumns().length;

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    search && search(e.target.value);
  };

  const handlePageChange = (
    event: ChangeEvent<unknown>,
    currentPage: number
  ) => {
    setPaginationPage(currentPage === 0 ? 1 : currentPage);
    page?.(currentPage === 0 ? 1 : currentPage);
  };
  return (
    <TableContainer component={Paper}>
      <Box padding="1rem">
        {memoisedHeaderComponent && <Box>{memoisedHeaderComponent}</Box>}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {search && (
            <TextField
              onChange={debounce(handleSearch, 1000)}
              size="small"
              label={searchLabel}
              margin="normal"
              variant="standard"
            />
          )}
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
          {!isFetching ? (
            getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    onClick={() => onClickRow?.(cell, row)}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <>
            {skeletons.map((skeleton) => (
              <TableRow key={skeleton}>
                {Array.from({ length: columnCount }, (x, i) => i).map(
                  (elm) => (
                    <TableCell key={elm}>
                      <Skeleton height={skeletonHeight} />
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </>
          )}
        </TableBody>
      </MUITable>
      {pageCount && page && (
        <StyledPagination
          count={pageCount}
          page={paginationPage}
          onChange={handlePageChange}
          color="primary"
        />
      )}
    </TableContainer>
  );
};

export default Table;
