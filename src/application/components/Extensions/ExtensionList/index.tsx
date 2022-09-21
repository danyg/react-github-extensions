import { useSelector } from "react-redux";
import { ExtensionCount } from "../../../../core";
import * as extensionFeature from "../../../../features/extensions";

import Extension from "../Extension";
import styles from "./ExtensionList.module.css";

const {
  selectors: { selectCurrent }
} = extensionFeature;

export default function ExtensionList() {
  const extensionCount = useSelector(selectCurrent) as ExtensionCount;

  return (
    <ul className={styles.mainList}>
      {Object.entries(extensionCount).map(([extension, count]) => (
        <li className={styles.listElement} key={extension}>
          <Extension extension={extension} count={count} />
        </li>
      ))}
    </ul>
  );
}
