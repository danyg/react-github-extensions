import { createFeaturesStore } from "../store";
import { AppState } from "./types";
import features from "../features";

export default function createAppStore(initialState?: AppState) {
  return createFeaturesStore(features, initialState);
}
