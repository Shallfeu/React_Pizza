import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = { currentPage: number; onPageChange: (page: number) => void };

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onPageChange(event.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={3}
    forcePage={currentPage}
  />
);

export default Pagination;
