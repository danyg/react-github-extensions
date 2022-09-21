import styles from "../NavBar.module.css";
import useSearch from "./useSearch";

export default function Search() {
  const { search, onKeyUp } = useSearch();

  return (
    <div className={styles.tool}>
      <h2>
        <span role="img" aria-label="Search">
          🔍
        </span>
      </h2>
      <input type="text" defaultValue={search} onKeyUp={onKeyUp} />
    </div>
  );
}
