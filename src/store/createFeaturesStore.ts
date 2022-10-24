import {
  applyMiddleware,
  CombinedState,
  combineReducers,
  createStore,
  PreloadedState,
  ReducersMapObject,
  Store
} from "redux";
import createSagaMiddleware, { Saga } from "redux-saga";
import { all } from "redux-saga/effects";
import { AppAction, Feature } from "./types";

function createRootSaga(sagas: Saga<any[]>[]) {
  function* rootSaga() {
    yield all(sagas.map((saga) => saga()));
  }
  return rootSaga;
}

const featureToSaga = (feature: Feature) => feature.saga;
const featuresToReducersMap = (
  reducers: ReducersMapObject<any, any>,
  { name, reducer }: Feature
) => ({ ...reducers, [name]: reducer });

export function createFeaturesStore<StateType>(
  features: Feature[],
  initialState?: PreloadedState<CombinedState<StateType>>
): Store<StateType, AppAction> {
  const sagasMiddleware = createSagaMiddleware();
  const sagas = features.map(featureToSaga);
  const reducers = features.reduce(
    featuresToReducersMap,
    {} as ReducersMapObject<StateType, AppAction>
  );

  const rootSaga = createRootSaga(sagas);
  const rootReducer = combineReducers<StateType, AppAction>(reducers);

  const store = createStore<CombinedState<StateType>, AppAction, any, any>(
    rootReducer,
    initialState,
    applyMiddleware(sagasMiddleware)
  );

  sagasMiddleware.run(rootSaga);
  return store;
}
