export type RepoLocator = {
  owner: string;
  repo: string;
};

/* **********************************************
Extracted from stackoverflow 
********************************************** */

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
