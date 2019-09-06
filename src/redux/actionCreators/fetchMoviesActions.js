import {axiosWithToken} from '../../utils/axiosHelpers';
import * as types from '../actionTypes/fetchMoviesTypes';

const fetchMoviesRequest = () => ({
  type: types.FETCH_MOVIES_REQUEST,
});

const fetchMoviesSuccess = movies => ({
  type: types.FETCH_MOVIES_SUCCESS,
  movies,
});

const fetchMoviesFailure = () => ({
  type: types.FETCH_MOVIES_FAILURE,
});

const fetchShowsRequest = () => ({
  type: types.FETCH_SHOWS_REQUEST,
});

const fetchShowsSuccess = shows => ({
  type: types.FETCH_SHOWS_SUCCESS,
  shows,
});

const fetchShowsFailure = () => ({
  type: types.FETCH_SHOWS_FAILURE,
});

const fetchMovieRequest = () => ({
  type: types.FETCH_MOVIE_REQUEST,
});

const fetchMovieSuccess = movie => ({
  type: types.FETCH_MOVIE_SUCCESS,
  movie,
});

const fetchMovieFailure = () => ({
  type: types.FETCH_MOVIE_FAILURE,
});

const fetchShowRequest = () => ({
  type: types.FETCH_SHOW_REQUEST,
});

const fetchShowSuccess = show => ({
  type: types.FETCH_SHOW_SUCCESS,
  show,
});

const fetchShowFailure = () => ({
  type: types.FETCH_SHOW_FAILURE,
});

const searchMoviesRequest = () => ({
  type: types.SEARCH_MOVIES_REQUEST,
});

const searchMoviesSuccess = movies => ({
  type: types.SEARCH_MOVIES_SUCCESS,
  movies,
});

const searchMoviesFailure = () => ({
  type: types.SEARCH_MOVIES_FAILURE,
});

const searchShowsRequest = () => ({
  type: types.SEARCH_SHOWS_REQUEST,
});

const searchShowsSuccess = shows => ({
  type: types.SEARCH_SHOWS_SUCCESS,
  shows,
});

const searchShowsFailure = () => ({
  type: types.SEARCH_SHOWS_FAILURE,
});

export const fetchMovies = sortBy => dispatch => {
  dispatch(fetchMoviesRequest());
  axiosWithToken
    .get('movies/1?sort=' + sortBy + '&limit=50&genre=All&order=-1')
    .then(response => {
      console.log(response.data);
      dispatch(fetchMoviesSuccess(response.data));
    })
    .catch(error => {
      console.log(error.request);
      dispatch(fetchMoviesFailure());
    });
};

export const fetchShows = sortBy => dispatch => {
  console.log(sortBy);
  dispatch(fetchShowsRequest());
  axiosWithToken
    .get('shows/1?sort=' + sortBy + '&limit=50&genre=All&order=-1')
    .then(response => {
      console.log(response.data);
      dispatch(fetchShowsSuccess(response.data));
    })
    .catch(error => {
      console.log(error.request.response);
      dispatch(fetchShowsFailure());
    });
};

export const fetchMovie = movieId => dispatch => {
  dispatch(fetchMovieRequest());
  console.log(movieId);
  axiosWithToken
    .get('movie/' + movieId)
    .then(response => {
      console.log(response.data);
      dispatch(fetchMovieSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchMovieFailure());
    });
};

export const fetchShow = showId => dispatch => {
  dispatch(fetchShowRequest());
  axiosWithToken
    .get('show/' + showId)
    .then(response => {
      console.log(response.data);
      dispatch(fetchShowSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchShowFailure());
    });
};

export const searchMovies = (searchText, filterBy) => dispatch => {
  dispatch(searchMoviesRequest());
  axiosWithToken
    .get(
      'movies/1?sort=' +
        filterBy +
        '&limit=50&keywords=' +
        searchText +
        '&order=-1',
    )
    .then(response => {
      console.log(response.data);
      dispatch(searchMoviesSuccess(response.data));
    })
    .catch(error => {
      console.log(error.request.response);
      dispatch(searchMoviesFailure());
    });
};

export const searchShows = (searchText, filterBy) => dispatch => {
  dispatch(searchShowsRequest());
  axiosWithToken
    .get(
      'shows/1?sort=' +
        filterBy +
        '&limit=50&keywords=' +
        searchText +
        '&order=-1',
    )
    .then(response => {
      console.log(response.data);
      dispatch(searchShowsSuccess(response.data));
    })
    .catch(error => {
      console.log(error.request.response);
      dispatch(searchShowsFailure());
    });
};
