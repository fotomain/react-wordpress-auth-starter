
//=== yarn add redux; yarn add redux-saga;
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagasAll     from './sagasAll';
import reducersAll  from './reducersAll';

const fff = (initialState) => {

  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(
    reducersAll(),
    initialState,
    enhancers
  );

  sagasAll.map(sagaMiddleware.run);

  return store;
}

export default fff