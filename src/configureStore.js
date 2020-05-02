import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createRootReducer from './reducer'
import rootSaga from './saga'

export const history = createBrowserHistory()

export default initialState => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(createRootReducer(history, {}), initialState, applyMiddleware(sagaMiddleware, logger, routerMiddleware(history)))

  // Реестр загруженных редьюсеров
  store.injectedReducers = {}

  // Реестр запущенных саг
  store.injectedSagas = new Map()

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.updateReducer = (key, reducer) => {
    reducer === null
      ? (delete store.injectedReducers[key])
      : (store.injectedReducers[key] = reducer)

    store.replaceReducer(createRootReducer(history, store.injectedReducers))
  }

  const createSagaInjector = (runSaga, rootSaga) => {
    const injectSaga = (key, saga) => {
      // We won't run saga if it is already injected
      if (!store.injectedSagas.has(key) && saga) {
        // Sagas return task when they executed, which can be used to cancel them
        const task = runSaga(saga)

        // Save the task if we want to cancel it in the future
        store.injectedSagas.set(key, task)
      }
    }

    // Inject the root saga as it a staticlly loaded file,
    injectSaga('root', rootSaga)

    return injectSaga
  }

  store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga)
  store.ejectSaga = key => {
    if (store.injectedSagas.has(key)) {
      store.injectedSagas.get(key).cancel()
      store.injectedSagas.delete(key)
    }
  }

  return store
}