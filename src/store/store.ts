import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import allReducers from "./index.reducers";
import rootSaga from "./index.sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// Run the saga
sagaMiddleware.run(rootSaga);

export type AppStore = typeof store;
export type AppState = ReturnType<typeof allReducers>;

export default store;
