import React from 'react';


interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({ total, pageSize, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  const createPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2; // show 2 pages before and after current
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);
    pages.push(1);
    if (left > 2) pages.push('…');
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }
    if (right < totalPages - 1) pages.push('…');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Table pagination" className="mt-3">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handlePrev}>Previous</button>
        </li>
        {createPageNumbers().map((p, idx) => (
          <li
            key={idx}
            className={`page-item ${p === currentPage ? 'active' : ''} ${p === '…' ? 'disabled' : ''}`}
          >
            {p === '…' ? (
              <span className="page-link">…</span>
            ) : (
              <button className="page-link" onClick={() => onPageChange(Number(p))}>
                {p}
              </button>
            )}
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNext}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationControls;
