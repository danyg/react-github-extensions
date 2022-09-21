import { all, put, select, takeLatest } from "redux-saga/effects";
import { searchBy, sortBy, transform } from "./actions";
import { selectSearch, selectSortOptions } from "./selectors";
import { selectData } from "../extensions/selectors";
import { transformationSuccess } from "../extensions/actions";
import { Entries, ExtensionCount, sort, SortOptions } from "../../core";

function* handleSearch() {
  const search: string = yield select(selectSearch);
  const extensions: ExtensionCount = yield select(selectData);

  const entries: Entries<ExtensionCount> = Object.entries(extensions);
  let transformedExtensionCount: ExtensionCount = entries
    .filter(([key]) => key.startsWith(search))
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as ExtensionCount
    );
  return transformedExtensionCount;
}

function* handleSort(extensionCount: ExtensionCount) {
  let transformedExtensionCount = extensionCount;
  const options: SortOptions = yield select(selectSortOptions);
  if (options)
    transformedExtensionCount = sort(transformedExtensionCount, options);
  return transformedExtensionCount;
}

function* handleTransform() {
  let transformedExtensionCount: ExtensionCount = yield* handleSearch();
  transformedExtensionCount = yield* handleSort(transformedExtensionCount);

  yield put(transformationSuccess(transformedExtensionCount));
}

function* mapToTransform() {
  yield put(transform());
}

export default function* rootExtensionSaga() {
  yield all([
    takeLatest(sortBy.type, mapToTransform),
    takeLatest(searchBy.type, mapToTransform),
    takeLatest(transform.type, handleTransform)
  ]);
}
