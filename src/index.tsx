import * as ReactDOMClient from "react-dom/client";

import ProvidedApp from "./application";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement as Element);

root.render(<ProvidedApp />);
