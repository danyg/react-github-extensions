import useSearch from "./useSearch";

export default function Search() {
  const { search, onKeyUp } = useSearch();

  return (
    <>
      <h2>
        <span role="img" aria-label="Search">
          🔍
        </span>
      </h2>
      <input type="text" defaultValue={search} onKeyUp={onKeyUp} />
    </>
  );
}
