const Pagination = ({ page, total, current }) => {
  const pageNumbers = [];
  for (let i = 1; i <= total; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => page(pageNumber)}
          disabled={pageNumber === current}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

