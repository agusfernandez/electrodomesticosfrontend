import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './styles/pagination.css';

const PaginationComponent = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map(number => (
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      />
    </Pagination>
  );
};

export default PaginationComponent;