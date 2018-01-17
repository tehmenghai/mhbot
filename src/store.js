import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger' // dun include this when in production mode
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import envReducer from './reducers/envReducer'
import userReducer from './reducers/userReducer'
import msgReducer from './reducers/msgReducer'
import adminReducer from './reducers/adminReducer'

const logger = createLogger({
    collapsed: true
})

export default createStore(
    combineReducers({ envReducer, userReducer, msgReducer, adminReducer }),
    {},
    applyMiddleware(logger, thunk, promiseMiddleware())
)
