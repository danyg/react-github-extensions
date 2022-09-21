import createAppStore from "./appStore";
import App from "./components/App";

const store = createAppStore();

export default function ProvidedApp() {
  return <App store={store} />;
}
