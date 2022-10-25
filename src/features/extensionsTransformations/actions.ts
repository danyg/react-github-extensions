import { SortOptions } from "core";
import {
  createActionCreator,
  createActionWithPayloadCreator
} from "store";
import name from "./name";

export const sortBy = createActionWithPayloadCreator<SortOptions | undefined>(
  `${name}:sortBy`
);

export const searchBy = createActionWithPayloadCreator<string>(
  `${name}:search`
);

export const transform = createActionCreator(`${name}:transform`);
