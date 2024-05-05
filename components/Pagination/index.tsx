import React from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  pageInfo: {
    currentPage: number;
    perPage: number;
    hasNextPage: boolean;
    totalCount: number;
  };
  setCurrentPage: (value: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pageInfo,
  setCurrentPage,
}) => {
  const handlePrevious = () => {
    if (pageInfo.currentPage > 1) {
      setCurrentPage(pageInfo.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pageInfo.hasNextPage) {
      setCurrentPage(pageInfo.currentPage + 1);
    }
  };

  if (!pageInfo) return null;

  return (
    <div className={styles.paginationContainer}>
      <span onClick={handlePrevious} className={styles.paginationBtn}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="left"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
        </svg>
      </span>
      <span className={styles.paginationIndicator}>{pageInfo.currentPage}</span>
      <span onClick={handleNext} className={styles.paginationBtn}>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="right"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
        </svg>
      </span>
    </div>
  );
};

export default Pagination;
