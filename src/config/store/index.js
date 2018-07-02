import thunk from 'redux-thunk'
import { Reducers } from 'uptoo-react-redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

export const history = createHistory()
const router = routerMiddleware(history)

let createStoreWithMiddleware

if (process.env.NODE_ENV === 'production' || process.env.PLATFORM_ENV !== 'web') {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(router)
    )(createStore)
} else {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(router)
    )(createStore)
}

export default function configureStore() {
    const store = createStoreWithMiddleware(combineReducers(Reducers))

    if (module.hot) {
        module.hot.accept('uptoo-react-redux/dist/reducers', () => {
            const nextRootReducer = combineReducers(Reducers)
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}
