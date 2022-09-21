import { RepoLocator } from "../../core";
import { ExtensionCount } from "../../core/models";
import { createActionWithPayloadCreator } from "../../store";
import { FeatureError } from "./types";

export const request = createActionWithPayloadCreator<RepoLocator>(
  "extension:request"
);

export const success = createActionWithPayloadCreator<ExtensionCount>(
  "extension:success"
);

export const failure = createActionWithPayloadCreator<FeatureError>(
  "extension:failure"
);

export const transformationSuccess = createActionWithPayloadCreator<
  ExtensionCount
>("extension:transformationSuccess");
