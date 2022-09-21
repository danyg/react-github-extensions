import styles from "../NavBar.module.css";
import useSortTool from "./useSortTool";

export default function SortTool() {
  const {
    extButtonClassName,
    extDirection,
    countButtonClassName,
    countDirection,
    extButtonOnClick,
    countButtonOnClick
  } = useSortTool();

  return (
    <div className={styles.tool}>
      <h2>Sort:</h2>
      <button
        type="button"
        className={extButtonClassName}
        onClick={extButtonOnClick}
      >
        Ext{" "}
        <span role="img" aria-label="direction">
          {extDirection}
        </span>
      </button>
      <button
        type="button"
        className={countButtonClassName}
        onClick={countButtonOnClick}
      >
        Count{" "}
        <span role="img" aria-label="direciton">
          {countDirection}
        </span>
      </button>
    </div>
  );
}
