export enum SortType {
  Key,
  Value
}

export enum SortDirection {
  ASC,
  DESC
}

export type SortOptions = {
  type: SortType;
  direction: SortDirection;
};
