import { Store } from "redux";
import { Provider } from "react-redux";

import { AppState } from "../../types";
import RouteHandler from "../RouteHandler";

import "./App.css";
import { useState } from "react";

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