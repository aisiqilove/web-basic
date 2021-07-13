import { createStore, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import indexReducer from './index';

const reducer = combineReducers({
    index: indexReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;