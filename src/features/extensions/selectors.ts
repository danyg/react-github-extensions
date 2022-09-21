import { FeatureState } from "./types";

export const selectLocator = (state: FeatureState) => state.extensions.locator;
export const selectCurrent = (state: FeatureState) => state.extensions.current;
export const selectData = (state: FeatureState) => state.extensions.data;
export const selectError = (state: FeatureState) => state.extensions.error;
export const isError = (state: FeatureState) => Boolean(state.extensions.error);
export const isLoading = (state: FeatureState) => state.extensions.loading;
