import {combineReducers} from 'redux';
import {fetchMoviesReducer} from './fetchMoviesReducer';

const rootReducer = combineReducers({
  fetchMoviesReducer: fetchMoviesReducer,
});

export default rootReducer;
