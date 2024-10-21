import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMoreImage }) => {
  return (
    <button type="button" onClick={loadMoreImage} className={css.btnLoadMore}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
