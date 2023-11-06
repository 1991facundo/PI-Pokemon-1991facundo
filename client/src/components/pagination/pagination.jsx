import styles from "../../assets/global.module.css";

const Pagination = ({ page, total, current }) => {
  const pageNumbers = [];
  for (let i = 1; i <= total; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((pageNumber) => {
        let buttonClass = styles.button;
        if (pageNumber === current) {
          buttonClass += ` ${styles.currentButton}`;
        }

        return (
          <button
            key={pageNumber}
            onClick={() => page(pageNumber)}
            disabled={pageNumber === current}
            className={buttonClass}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
