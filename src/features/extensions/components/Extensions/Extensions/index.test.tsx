import React from "react";
import { render, screen } from "@testing-library/react";

import { initialState as extensionsInitialState } from "features/extensions";
import { initialState as extensionsTransformationsInitialState } from "features/extensionsTransformations";
import Extensions from "./index";
import { MemoryRouter } from "react-router";

import { createFakeStoreProvider } from "test/FakeStoreProvider";
import { RepoLocator } from "core";
import { AppState } from "features/types";

describe("Extensions / Extensions", () => {
  it("should expose the current repository URI", () => {
    const state = getExtensionsEmptyState({
      repo: "go-to-tests",
      owner: "danyg",
    });
    const { fakeStore, ProvidedFakeStoreProvider } =
      createFakeStoreProvider(state);
    render(
      <MemoryRouter initialEntries={["/danyg/go-to-tests"]}>
        <ProvidedFakeStoreProvider>
          <Extensions />
        </ProvidedFakeStoreProvider>
      </MemoryRouter>
    );

    const repoTitle = screen.getByText("danyg / go-to-tests");

    expect(repoTitle).toBeInTheDocument();
  });
});

const getExtensionsEmptyState = (locator: RepoLocator): Partial<AppState> => {
  const state = JSON.parse(
    JSON.stringify({
      ...extensionsInitialState,
      ...extensionsTransformationsInitialState,
    })
  );
  state.extensions.data = [];
  state.extensions.current = [];
  state.extensions.locator = locator;
  state.extensions.loading = false;
  return state;
};
