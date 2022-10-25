import { useSelector } from "react-redux";
import { selectLocator, isLoading } from "features/extensions/selectors";

import SortTool from "features/extensionsTransformations/components/SortTool";
import Search from "features/extensionsTransformations/components/Search";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const locator = useSelector(selectLocator);
  const loading = useSelector(isLoading);

  if (!locator || loading)
    return <div className={styles.NavBar}>Loading...</div>;

  return (
    <div className={styles.NavBar}>
      <div className={styles.tool}>
        {locator.owner} / {locator.repo}
      </div>

      <div className={styles.tool}>
        <SortTool />
      </div>

      <div className={styles.tool}>
        <Search />
      </div>
    </div>
  );
}
