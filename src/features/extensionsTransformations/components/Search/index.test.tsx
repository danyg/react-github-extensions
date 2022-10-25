import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { searchBy } from "features/extensionsTransformations/actions";
import Search from "features/extensionsTransformations/components/Search";
import { initialState } from "features/extensionsTransformations/reducer";
import { createFakeStoreProvider } from "test/FakeStoreProvider";

describe("Extensions Transformations / Search Component", () => {
  it("should dispatch the searchBy action with the search term introduced in the input", () => {
    const { fakeStore, ProvidedFakeStoreProvider } =
      createFakeStoreProvider(initialState);
    render(
      <ProvidedFakeStoreProvider>
        <Search />
      </ProvidedFakeStoreProvider>
    );

    const input = screen.getByTestId("search-input");
    fireEvent.keyUp(input, { target: { value: "tsx" } });

    expect(fakeStore.dispatch).toHaveBeenCalledWith(searchBy("tsx"));
  });

  it("should dispatch the searchBy by every key is pressed (keyup)", () => {
    const { fakeStore, ProvidedFakeStoreProvider } =
      createFakeStoreProvider(initialState);
    render(
      <ProvidedFakeStoreProvider>
        <Search />
      </ProvidedFakeStoreProvider>
    );

    const input = screen.getByTestId("search-input");
    fireEvent.keyUp(input, { target: { value: "t" } });
    fireEvent.keyUp(input, { target: { value: "ts" } });
    fireEvent.keyUp(input, { target: { value: "tsx" } });

    expect(fakeStore.dispatch).toHaveBeenCalledWith(searchBy("t"));
    expect(fakeStore.dispatch).toHaveBeenCalledWith(searchBy("ts"));
    expect(fakeStore.dispatch).toHaveBeenCalledWith(searchBy("tsx"));
  });

  it("should show the search term stored in redux", () => {
    const modifiedState = JSON.parse(JSON.stringify(initialState));
    modifiedState.extensionsTransformations.search = "searchTerm";

    const { fakeStore, ProvidedFakeStoreProvider } =
      createFakeStoreProvider(modifiedState);
    render(
      <ProvidedFakeStoreProvider>
        <Search />
      </ProvidedFakeStoreProvider>
    );

    const input = screen.getByDisplayValue("searchTerm");

    expect(input).toBeVisible();
  });
});
