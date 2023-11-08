import styles from "../../assets/global.module.css";

const Pagination = ({ page, total, current }) => {
  const pageNumbers = [];
  for (let i = 1; i <= total; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>



      <button
        onClick={() => page(current - 1)}
        disabled={current === 1}
        className={styles.button}
      >
        Previous
      </button>




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

      


      <button
        onClick={() => page(current + 1)}
        disabled={current === total}
        className={styles.button}
      >
        Next
      </button>



    </div>
  );
};

export default Pagination;
