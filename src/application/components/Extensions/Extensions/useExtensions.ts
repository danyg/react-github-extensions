import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { equalsRepoLocator, RepoLocator } from "../../../../core";
import {
  MainBranchNotFound,
  RepositoryNotFound,
  ServiceUnreachable
} from "../../../../core/models/errors";
import * as extensionFeature from "../../../../features/extensions";
import { FeatureError } from "../../../../features/extensions/types";

const {
  selectors: {
    selectLocator,
    isLoading: isLoadingSelector,
    selectError
  },
  actions: { request }
} = extensionFeature;

function getErrorString(error: FeatureError | undefined, locator: RepoLocator) {
  if (!error) return "";
  if (error instanceof RepositoryNotFound)
    return `Repository "${locator.owner}/${locator.repo}" Not Found!`;
  if (error instanceof ServiceUnreachable) return "Cannot reach github!";
  if (error instanceof MainBranchNotFound)
    return `Repository "${locator.owner}/${locator.repo}" lacks main or master branch`;
}

export default function useExtensions() {
  const locator = useParams<RepoLocator>() as RepoLocator;

  const currentLocator = useSelector(selectLocator);
  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(selectError);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchRequest = (repoLocator: RepoLocator) =>
      dispatch(request(repoLocator));
    if (!equalsRepoLocator(locator, currentLocator)) {
      dispatchRequest(locator as RepoLocator);
    }
  }, [dispatch, currentLocator, locator]);

  const errorString = getErrorString(error, locator);

  return { isLoading, isError, errorString };
}
