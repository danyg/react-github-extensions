import { FeatureState } from "./types";

export const selectSortOptions = (state: FeatureState) =>
  state.extensionsTransformations.sortOptions;

export const selectSearch = (state: FeatureState) =>
  state.extensionsTransformations.search;
