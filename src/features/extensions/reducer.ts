import { AppAction, isAction } from "store";
import { failure, request, success, transformationSuccess } from "./actions";
import { FeatureState } from "./types";

export const initialState: FeatureState = {
  extensions: {
    loading: true,
    locator: undefined,
    data: undefined,
    current: undefined,
    error: undefined
  }
};

export function reducer(
  state: FeatureState["extensions"],
  action: AppAction
): FeatureState["extensions"] {
  if (isAction(action, request))
    return {
      loading: true,
      locator: action.payload
    };
  if (isAction(action, success))
    return {
      ...state,
      loading: false,
      data: action.payload,
      current: action.payload
    };
  if (isAction(action, transformationSuccess))
    return {
      ...state,
      current: action.payload
    };
  if (isAction(action, failure))
    return {
      ...state,
      loading: false,
      error: action.payload,
      data: undefined,
      current: undefined
    };
  if (undefined === state) return initialState.extensions;

  return state;
}
