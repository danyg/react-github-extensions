import { useFormNavigate } from "./useFormNavigate";
import styles from "./Home.module.css";

export default function Home() {
  const onSubmit = useFormNavigate();
  return (
    <div className={styles.Home}>
      <form action="" onSubmit={onSubmit}>
        <div className={styles.input}>
          <label htmlFor="owner">Owner</label>
          <input name="owner" id="owner" type="text" />
        </div>
        <div className={styles.input}>
          <label htmlFor="repo">Repo</label>
          <input name="repo" id="repo" type="text" />
        </div>
        <div className={styles.input}>
          <button type="submit" className={styles.submit}>
            View Extensions
          </button>
        </div>
      </form>
    </div>
  );
}
