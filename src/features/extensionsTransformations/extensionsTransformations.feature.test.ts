import { PreloadedState } from "redux";
import {
  ExtensionCount,
  SortDirection,
  SortOptions,
  SortType
} from "../../core";
import { createFeaturesStore } from "../../store";
import expectedExtensionsCount from "../../test/expectedExtensionsCount";
import * as extensionFeature from "../extensions";
import { selectCurrent } from "../extensions/selectors";
import * as feature from "./";

const {
  actions: { sortBy, searchBy },
  selectors: { selectSortOptions, selectSearch }
} = feature;

type ExtensionsState = extensionFeature.types.FeatureState;
type FeatureState = feature.types.FeatureState;
type State = ExtensionsState & FeatureState;

const preloadState: Partial<State> = {
  extensions: {
    loading: false,
    locator: { owner: "o", repo: "r" },
    data: expectedExtensionsCount,
    current: expectedExtensionsCount
  }
};

function getStore(initialState: Partial<PreloadedState<State>>) {
  return createFeaturesStore<State>([feature, extensionFeature], initialState);
}

describe("ExtensionSort", () => {
  it("initializes the state with initialState", () => {
    const store = getStore(preloadState);

    expect(store.getState().extensionsTransformations).toStrictEqual({
      sortOptions: undefined,
      search: ""
    });
  });

  it("sortBy stores sortOptions for further use", () => {
    const store = getStore(preloadState);
    const sortOptions: SortOptions = {
      type: SortType.Key,
      direction: SortDirection.ASC
    };
    store.dispatch(sortBy(sortOptions));

    expect(selectSortOptions(store.getState())).toStrictEqual(sortOptions);
  });

  it("searchBy stores sortOptions for further use", () => {
    const store = getStore(preloadState);
    const search: string = "js";
    store.dispatch(searchBy(search));

    expect(selectSearch(store.getState())).toStrictEqual(search);
  });

  it("searchBy trigger transformations", () => {
    const store = getStore(preloadState);
    const search: string = "js";
    store.dispatch(searchBy(search));

    expect(selectCurrent(store.getState())).toStrictEqual({ json: 5 });
  });

  describe("sortBy trigger transformations", () => {
    it("sortsBy Key ASC", () => {
      const store = getStore(preloadState);
      const sortOptions: SortOptions = {
        type: SortType.Key,
        direction: SortDirection.ASC
      };
      store.dispatch(sortBy(sortOptions));

      const keys = Object.keys(
        selectCurrent(store.getState()) as ExtensionCount
      );
      expect(keys).toStrictEqual([
        "vscodeignore",
        "prettierrc",
        "md",
        "json",
        "gitignore",
        "editorconfig"
      ]);
    });

    it("sortsBy Key DESC", () => {
      const store = getStore(preloadState);
      const sortOptions: SortOptions = {
        type: SortType.Key,
        direction: SortDirection.DESC
      };
      store.dispatch(sortBy(sortOptions));

      const keys = Object.keys(
        selectCurrent(store.getState()) as ExtensionCount
      );
      expect(keys).toStrictEqual([
        "editorconfig",
        "gitignore",
        "json",
        "md",
        "prettierrc",
        "vscodeignore"
      ]);
    });

    it("sortsBy Value ASC", () => {
      const store = getStore(preloadState);
      const sortOptions: SortOptions = {
        type: SortType.Value,
        direction: SortDirection.ASC
      };
      store.dispatch(sortBy(sortOptions));

      const keys = Object.keys(
        selectCurrent(store.getState()) as ExtensionCount
      );
      expect(keys).toStrictEqual([
        "editorconfig",
        "gitignore",
        "prettierrc",
        "vscodeignore",
        "md",
        "json"
      ]);
    });

    it("sortsBy Value DESC", () => {
      const store = getStore(preloadState);
      const sortOptions: SortOptions = {
        type: SortType.Value,
        direction: SortDirection.DESC
      };
      store.dispatch(sortBy(sortOptions));

      const keys = Object.keys(
        selectCurrent(store.getState()) as ExtensionCount
      );
      expect(keys).toStrictEqual([
        "json",
        "md",
        "editorconfig",
        "gitignore",
        "prettierrc",
        "vscodeignore"
      ]);
    });

    it("sortsBy undefined use default sort", () => {
      const store = getStore(preloadState);
      const sortOptions: SortOptions = {
        type: SortType.Value,
        direction: SortDirection.DESC
      };
      store.dispatch(sortBy(sortOptions));
      store.dispatch(sortBy(undefined));

      const keys = Object.keys(
        selectCurrent(store.getState()) as ExtensionCount
      );
      expect(keys).toStrictEqual([
        "editorconfig",
        "gitignore",
        "json",
        "md",
        "prettierrc",
        "vscodeignore"
      ]);
    });
  });

  it("can combine both transformation", () => {
    const state = {
      ...preloadState,
      extensions: {
        ...preloadState.extensions,
        data: {
          ...preloadState?.extensions?.data,
          js: 20
        }
      }
    };
    const store = getStore(state as State);
    const search: string = "js";
    const sortOptions: SortOptions = {
      type: SortType.Value,
      direction: SortDirection.DESC
    };
    store.dispatch(searchBy(search));
    store.dispatch(sortBy(sortOptions));

    const current = selectCurrent(store.getState()) as ExtensionCount;
    const keys = Object.keys(current);
    expect(current).toStrictEqual({ js: 20, json: 5 });
    expect(keys).toStrictEqual(["js", "json"]);
  });
});
