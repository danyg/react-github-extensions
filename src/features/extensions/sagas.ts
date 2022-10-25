import { call, put, takeLatest } from "redux-saga/effects";
import { RepoLocator, fileListToExtensionCount } from "core";
import { FileList } from "core/models";
import {
  MainBranchNotFound,
  RepositoryNotFound,
  ServiceUnreachable
} from "core/models/errors";
import { getFileListFromRepo } from "services/github";
import { ActionWithPayload } from "store";
import { failure, request, success } from "./actions";
import { FeatureError } from "./types";

const isFeatureError = (error: unknown): error is FeatureError =>
  error instanceof ServiceUnreachable ||
  error instanceof MainBranchNotFound ||
  error instanceof RepositoryNotFound;

function* handleRequest(action: ActionWithPayload<RepoLocator>) {
  const repoLocator: RepoLocator = action.payload;

  try {
    const list: FileList = yield call(getFileListFromRepo, repoLocator);
    const extensionsCount = fileListToExtensionCount(list);
    yield put(success(extensionsCount));
  } catch (e) {
    if (isFeatureError(e)) yield put(failure(e));
    // TODO any other error mapped to ServiceUnreachable or some generic error
  }
}

export default function* rootExtensionSaga() {
  yield takeLatest(request.type, handleRequest);
}
