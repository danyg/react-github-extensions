import style from "./Extension.module.css";

type Props = {
  extension: string;
  count: number;
};

export default function Extension({ extension, count }: Props) {
  return (
    <div className={style.extensionContainer}>
      <span className={style.extension}>{extension}</span>
      <span className={style.count}>{count}</span>
    </div>
  );
}
