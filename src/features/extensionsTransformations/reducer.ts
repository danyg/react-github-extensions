import { AppAction, isAction } from "../../store";
import { searchBy, sortBy } from "./actions";
import { FeatureState } from "./types";

export const initialState: FeatureState = {
  extensionsTransformations: {
    sortOptions: undefined,
    search: ""
  }
};

export function reducer(state: FeatureState, action: AppAction) {
  if (isAction(action, sortBy))
    return { ...state, sortOptions: action.payload };
  if (isAction(action, searchBy)) return { ...state, search: action.payload };
  if (!state) return initialState.extensionsTransformations;
  return state;
}
