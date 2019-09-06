import * as types from '../actionTypes/fetchMoviesTypes';

const initialState = {
  loading: false,
  movies: [],
  shows: [],
  movie: {},
  show: {},
};

export const fetchMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };
    case types.FETCH_MOVIES_FAILURE:
      return {
        loading: false,
      };
    case types.FETCH_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        movie: action.movie,
      };
    case types.FETCH_MOVIE_FAILURE:
      return {
        loading: false,
      };
    case types.FETCH_SHOWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        loading: false,
        shows: action.shows,
      };
    case types.FETCH_SHOWS_FAILURE:
      return {
        loading: false,
      };
    case types.FETCH_SHOW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_SHOW_SUCCESS:
      return {
        ...state,
        loading: false,
        show: action.show,
      };
    case types.FETCH_SHOW_FAILURE:
      return {
        loading: false,
      };
    case types.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };
    case types.SEARCH_MOVIES_FAILURE:
      return {
        loading: false,
      };
    case types.SEARCH_SHOWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SEARCH_SHOWS_SUCCESS:
      return {
        ...state,
        loading: false,
        shows: action.shows,
      };
    case types.SEARCH_SHOWS_FAILURE:
      return {
        loading: false,
      };
    default:
      return state;
  }
};
