import { RepoLocator, ExtensionCount } from "core";
import {
  MainBranchNotFound,
  RepositoryNotFound,
  ServiceUnreachable
} from "core/models/errors";

export type FeatureError =
  | RepositoryNotFound
  | ServiceUnreachable
  | MainBranchNotFound;

export type FeatureState = {
  extensions: {
    loading: boolean;
    locator?: RepoLocator;
    data?: ExtensionCount;
    current?: ExtensionCount;
    error?: FeatureError;
  };
};
