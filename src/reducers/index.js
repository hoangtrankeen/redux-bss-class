import filter from './filter'
import todo from './todo'
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({filter,todo});