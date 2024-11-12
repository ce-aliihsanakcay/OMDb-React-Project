import React from "react";
import "./pagination.scss";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <div className="page-nav">
        <div className="prev">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </div>
        <div className="pages">
          {pages.map((page) => {
            if (
              page === currentPage ||
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            ) {
              return (
                <div
                  key={page}
                  className={`page-item ${
                    page === currentPage ? "active" : ""
                  }`}
                >
                  <button onClick={() => handlePageChange(page)}>{page}</button>
                </div>
              );
            }

            if (page === currentPage - 3 || page === currentPage + 3) {
              return (
                <div key={page} className="page-item ellipsis">
                  <button>...</button>
                </div>
              );
            }

            return null;
          })}
        </div>
        <div className="next">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
