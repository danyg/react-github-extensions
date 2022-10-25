import {
  MainBranchNotFound,
  RepositoryNotFound,
  ServiceUnreachable
} from "core/models/errors";
import { createFeaturesStore } from "store";
import expectedExtensionsCount from "test/expectedExtensionsCount";
import { makeApiGithubServerBeforeEachTest } from "test/servers/api-github.server";
import { wait } from "test/wait";

import * as feature from "./";
import { transformationSuccess } from "./actions";
import {
  isError,
  isLoading,
  selectCurrent,
  selectData,
  selectError,
  selectLocator
} from "./selectors";

type FeatureState = feature.types.FeatureState;

describe("Extension Feature", () => {
  makeApiGithubServerBeforeEachTest();

  it("when store is created the state has a proper initial state", async () => {
    const store = createFeaturesStore<FeatureState>([feature]);

    expect(store.getState().extensions).toEqual(
      feature.initialState.extensions
    );
    expect(store.getState().extensions).toEqual({
      loading: true,
      locator: undefined,
      data: undefined,
      current: undefined,
      error: undefined
    });
  });

  it("saves locator dispatched in extension:request in the state", async () => {
    const store = createFeaturesStore<FeatureState>([feature]);
    const locator = { owner: "someOwner", repo: "someRepo" };

    store.dispatch(feature.actions.request(locator));

    expect(selectLocator(store.getState())).toEqual(locator);
  });

  it("saves an extensionCount in the store after dispatching action extension:request", async () => {
    const store = createFeaturesStore<FeatureState>([feature]);

    store.dispatch(
      feature.actions.request({ owner: "danyg", repo: "go-to-test" })
    );
    await wait(() => expect(store.getState().extensions.data).toBeDefined());

    expect(selectData(store.getState())).toEqual(expectedExtensionsCount);
  });

  it("keeps the locator in the state after a extension:success", async () => {
    const store = createFeaturesStore<FeatureState>([feature]);
    const locator = { owner: "danyg", repo: "go-to-test" };

    store.dispatch(feature.actions.request(locator));
    await wait(() => expect(store.getState().extensions.data).toBeDefined());

    expect(selectLocator(store.getState())).toEqual(locator);
  });

  it("clean a previous error from the state when extension:request", async () => {
    const store = createFeaturesStore<FeatureState>([feature], {
      extensions: {
        loading: false,
        error: new Error("error"),
        locator: { owner: "error", repo: "error" }
      }
    });
    expect(selectError(store.getState())).toBeDefined();
    expect(isError(store.getState())).toBe(true);
    const locator = { owner: "danyg", repo: "go-to-test" };

    store.dispatch(feature.actions.request(locator));

    expect(selectError(store.getState())).toBeUndefined();
    expect(isError(store.getState())).toBe(false);
  });

  it("saves an extensionCount as current in the store equal to data so that transformations (sort/filter) are done from data and store in current", async () => {
    const store = createFeaturesStore<FeatureState>([feature]);

    store.dispatch(
      feature.actions.request({ owner: "danyg", repo: "go-to-test" })
    );
    await wait(() => expect(selectData(store.getState())).toBeDefined());

    expect(selectData(store.getState())).toEqual(expectedExtensionsCount);
    expect(selectCurrent(store.getState())).toEqual(
      selectData(store.getState())
    );
  });

  it("set loading flag to true when request is dispatched and set it to false when data arrives", async () => {
    const store = createFeaturesStore<FeatureState>([feature]);

    store.dispatch(
      feature.actions.request({ owner: "danyg", repo: "go-to-test" })
    );

    expect(isLoading(store.getState())).toEqual(true);

    await wait(() => expect(isLoading(store.getState())).toBe(false));

    expect(isLoading(store.getState())).toEqual(false);
  });

  describe("stores the business error when it occurs", () => {
    it("and cleans previous data", async () => {
      const store = createFeaturesStore<FeatureState>([feature], {
        extensions: {
          loading: false,
          locator: { owner: "o", repo: "r" },
          data: expectedExtensionsCount,
          current: expectedExtensionsCount
        }
      });

      store.dispatch(
        feature.actions.request({ owner: "owner500", repo: "repo500" })
      );
      await wait(() => expect(store.getState().extensions.error).toBeDefined());

      expect(selectData(store.getState())).toBeUndefined();
      expect(selectCurrent(store.getState())).toBeUndefined();
      expect(selectLocator(store.getState())).toEqual({
        owner: "owner500",
        repo: "repo500"
      });
    });

    it("ServiceUnreachable", async () => {
      const store = createFeaturesStore<FeatureState>([feature]);

      store.dispatch(
        feature.actions.request({ owner: "owner500", repo: "repo500" })
      );
      await wait(() => expect(isError(store.getState())).toBe(true));

      expect(selectError(store.getState())).toBeInstanceOf(ServiceUnreachable);
    });

    it("MainBranchNotFound", async () => {
      const store = createFeaturesStore<FeatureState>([feature]);

      store.dispatch(
        feature.actions.request({ owner: "fakeBranchName", repo: "pepe" })
      );
      await wait(() => expect(isError(store.getState())).toBe(true));

      expect(selectError(store.getState())).toBeInstanceOf(MainBranchNotFound);
    });

    it("RepositoryNotFound", async () => {
      const store = createFeaturesStore<FeatureState>([feature]);

      store.dispatch(
        feature.actions.request({ owner: "ownerNotFound", repo: "repo" })
      );
      await wait(() => expect(isError(store.getState())).toBe(true));

      expect(selectError(store.getState())).toBeInstanceOf(RepositoryNotFound);
    });
  });

  it("loading false when errors", async () => {
    const store = createFeaturesStore<FeatureState>([feature]);

    store.dispatch(
      feature.actions.request({ owner: "ownerNotFound", repo: "repo" })
    );

    expect(isLoading(store.getState())).toEqual(true);

    await wait(() => expect(isError(store.getState())).toBe(true));

    expect(isLoading(store.getState())).toEqual(false);
  });

  it("allows plugins through extension:transformationSuccess", () => {
    const store = createFeaturesStore<FeatureState>([feature], {
      extensions: {
        loading: false,
        locator: { owner: "o", repo: "r" },
        data: expectedExtensionsCount,
        current: expectedExtensionsCount
      }
    });

    store.dispatch(transformationSuccess({})); // simulates a string filter

    expect(selectCurrent(store.getState())).toStrictEqual({});
  });
});
