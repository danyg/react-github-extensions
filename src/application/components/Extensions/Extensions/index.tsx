import ExtensionList from "../ExtensionList";
import NavBar from "../NavBar";
import useExtensions from "./useExtensions";

import styles from "./Extensions.module.css";
import { Link } from "react-router-dom";

export default function Extensions() {
  const { isLoading, isError, errorString } = useExtensions();

  if (isError)
    return (
      <div className={styles.main}>
        <h1>{errorString}</h1>
        <Link to="/">Go back to home</Link>
      </div>
    );

  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        {!isLoading ? <ExtensionList /> : "Loading..."}
      </div>
    </div>
  );
}
