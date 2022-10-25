import { ArrayElement, Entries } from "core/types";

export type ExtensionCount = {
  [key: string]: number;
};

export type ExtensionCountEntries = Entries<ExtensionCount>;
export type ExtensionCountEntry = ArrayElement<ExtensionCountEntries>;
