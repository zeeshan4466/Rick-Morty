import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, onPageChange }) => {
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <MuiPagination
      count={20}
      page={page}
      onChange={handlePageChange}
      color="primary"
    />
  );
};

export default Pagination;
