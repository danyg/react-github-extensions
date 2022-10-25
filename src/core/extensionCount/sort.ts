import {
  ExtensionCount,
  ExtensionCountEntry,
  SortDirection,
  SortOptions,
  SortType
} from "core/models";

type SortFunction = (a: ExtensionCountEntry, b: ExtensionCountEntry) => number;
type DirectionSortFunctions = {
  [key in SortDirection]: SortFunction;
};
type SortFunctions = {
  [key in SortType]: DirectionSortFunctions;
};

const SORT_FUNCTIONS: SortFunctions = {
  [SortType.Value]: {
    [SortDirection.ASC]: ([_keyA, valueA], [_keyB, valueB]) => valueA - valueB,
    [SortDirection.DESC]: ([_keyA, valueA], [_keyB, valueB]) => valueB - valueA
  },
  [SortType.Key]: {
    [SortDirection.DESC]: ([keyA], [keyB]) => (keyB < keyA ? 1 : -1),
    [SortDirection.ASC]: ([keyA], [keyB]) => (keyA < keyB ? 1 : -1)
  }
};

export function sort(
  extensionCount: ExtensionCount,
  options: SortOptions
): ExtensionCount {
  const sortFunction = SORT_FUNCTIONS[options.type][options.direction];

  const entries = Object.entries(extensionCount);
  const sortedEntries = entries.sort(sortFunction);
  return Object.fromEntries(sortedEntries);
}
