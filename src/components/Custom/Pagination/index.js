import React from 'react';
import { TablePagination } from "@mui/material";
import SuiBox from "components/SuiBox";

const Pagination = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  return (
    <SuiBox display="flex" justifyContent="start" sx={{ width: '10%' }} mt={2}>
      <TablePagination
        sx={{ overflow: "visible" }}
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Show items"
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange} />
    </SuiBox>
  );
};

export default Pagination;