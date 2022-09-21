import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBy } from "../../../../../features/extensionsTransformations/actions";
import { selectSearch } from "../../../../../features/extensionsTransformations/selectors";

const getValue = (event: React.KeyboardEvent<HTMLInputElement>) =>
  (event.target as HTMLInputElement).value;

export default function useSearch() {
  const search = useSelector(selectSearch) || "";
  const dispatch = useDispatch();
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch(searchBy(getValue(event)));
  };
  return { search, onKeyUp };
}
