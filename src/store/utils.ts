import {
  ActionCreator,
  ActionWithPayloadCreator,
  AppAction,
  AppActionCreator
} from "./types";

export function createActionCreator(type: string): ActionCreator {
  const creator = () => ({
    type
  });
  creator.type = type;

  return creator;
}

export function createActionWithPayloadCreator<T>(
  type: string
): ActionWithPayloadCreator<T> {
  const creator = (payload: T) => ({
    payload,
    type
  });
  creator.type = type;

  return creator;
}

export const isAction = <T extends AppActionCreator>(
  action: AppAction,
  creator: T
): action is ReturnType<T> => action.type === creator.type;
