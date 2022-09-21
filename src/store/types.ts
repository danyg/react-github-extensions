import { Action, Reducer } from "redux";
import { Saga } from "redux-saga";

export interface BaseAction extends Action {}
export interface ActionWithPayload<T> extends Action {
  payload: T;
}
export type AppAction = BaseAction | ActionWithPayload<{}>;

export interface ActionCreator {
  (): BaseAction;
  type: string;
}

export interface ActionWithPayloadCreator<T> {
  (payload: T): ActionWithPayload<T>;
  type: string;
}

export interface Payload {
  [prop: string]: any;
}

export type AppActionCreator = ActionCreator | ActionWithPayloadCreator<any>;
export type Actions = {
  [key: string]: AppActionCreator;
};

export interface Feature {
  name: string;
  saga: Saga;
  reducer: Reducer;
  actions: Actions;
  initialState: {};
  types: {};
}
