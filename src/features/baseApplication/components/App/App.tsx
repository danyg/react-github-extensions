import React, { useState } from "react";
import { Store } from "redux";
import { Provider } from "react-redux";

import { AppState } from "features/types";
import RouteHandler from "features/baseApplication/components/RouteHandler";

import "./App.css";

type Props = {
  store: Store<AppState>;
};

const DARK = "palleteDark";
const BRIGHT = "palleteBright";
const togglePallete = (setPallete: (p: string) => void, pallete: string) =>
  pallete === DARK ? setPallete(BRIGHT) : setPallete(DARK);

export function App({ store }: Props) {
  const [pallete, setPallete] = useState("palleteDark");

  return (
    <div className={`main ${pallete}`}>
      <button
        className="togglePalleteBtn"
        onClick={() => togglePallete(setPallete, pallete)}
      >
        {pallete === BRIGHT ? "🖤" : "😎"}
      </button>
      <Provider store={store}>
        <RouteHandler />
      </Provider>
    </div>
  );
}
