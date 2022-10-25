import { useDispatch, useSelector } from "react-redux";
import * as extensionsTransformationsFeature from "features/extensionsTransformations";
import { SortDirection, SortOptions, SortType } from "core";
import { sortBy } from "features/extensionsTransformations/actions";

import styles from "../NavBar.module.css";

const {
  selectors: { selectSortOptions }
} = extensionsTransformationsFeature;
const ExtensionAsc: SortOptions = {
  type: SortType.Key,
  direction: SortDirection.ASC
};
const ExtensionDesc: SortOptions = {
  type: SortType.Key,
  direction: SortDirection.DESC
};
const CountAsc: SortOptions = {
  type: SortType.Value,
  direction: SortDirection.ASC
};
const CountDesc: SortOptions = {
  type: SortType.Value,
  direction: SortDirection.DESC
};
export default function useSortTool() {
  const options = useSelector(selectSortOptions);
  const dispatch = useDispatch();

  const isSortedByExtension = options?.type === SortType.Key;
  const isSortedByCount = options?.type === SortType.Value;
  const extButtonClassName = isSortedByExtension ? styles.pressed : "";
  const countButtonClassName = isSortedByCount ? styles.pressed : "";
  const isAsc = options?.direction === SortDirection.ASC;
  const isDesc = options?.direction === SortDirection.DESC;
  const extDirection = isSortedByExtension ? (isAsc ? "⬆" : "⬇") : "-";
  const countDirection = isSortedByCount ? (isAsc ? "⬆" : "⬇") : "-";

  const extButtonOnClick = () => {
    if (!isSortedByExtension) dispatch(sortBy(ExtensionAsc));
    if (isSortedByExtension && isAsc) dispatch(sortBy(ExtensionDesc));
    if (isSortedByExtension && isDesc) dispatch(sortBy(undefined));
  };

  const countButtonOnClick = () => {
    if (!isSortedByCount) dispatch(sortBy(CountAsc));
    if (isSortedByCount && isAsc) dispatch(sortBy(CountDesc));
    if (isSortedByCount && isDesc) dispatch(sortBy(undefined));
  };

  return {
    extButtonClassName,
    extDirection,
    countButtonClassName,
    countDirection,
    extButtonOnClick,
    countButtonOnClick
  };
}
