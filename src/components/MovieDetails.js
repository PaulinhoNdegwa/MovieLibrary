import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import {Card, CardItem, Left, Right, Text} from 'native-base';
import {fetchMovie} from '../redux/actionCreators/fetchMoviesActions';

class MovieDetails extends Component {
  componentDidMount() {
    const {fetchMovie} = this.props;
    const {movieId} = this.props.navigation.state.params;
    fetchMovie(movieId);
  }

  renderGenres = genres => {
    const mappedGenres =
      genres.length !== 0
        ? genres.map((genre, index) => {
            return (
              <Text style={styles.genre} key={index}>
                |{genre}|
              </Text>
            );
          })
        : null;
    return mappedGenres;
  };

  renderMovie = movie => {
    const mappedMovie =
      Object.keys(movie).length !== 0 ? (
        <Card>
          <CardItem>
            <Image
              source={{uri: movie.images.poster}}
              style={styles.movieImage}
              resizeMode="cover"
            />
          </CardItem>
          <CardItem>
            <View>
              <Text style={styles.genres}>
                {this.renderGenres(movie.genres)}
              </Text>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text note>{movie.year}</Text>
              <Text style={styles.movieSynopsis}>{movie.synopsis}</Text>
              <Text style={styles.movieRating}>
                Rating: {movie.rating.percentage}%
              </Text>
            </View>
          </CardItem>
        </Card>
      ) : null;
    return mappedMovie;
  };

  render() {
    const {movie, loading} = this.props;
    console.log(movie);
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={styles.container}>
        <ScrollView>{this.renderMovie(movie)}</ScrollView>
      </View>
    );
  }
}
const mapStateToProps = ({fetchMoviesReducer}) => ({
  loading: fetchMoviesReducer.loading,
  movie: fetchMoviesReducer.movie,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMovie: params => dispatch(fetchMovie(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieImage: {
    height: Platform.OS === 'ios' ? 500 : 700,
    width: '100%',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieSynopsis: {
    fontSize: 13,
    marginBottom: 5,
    marginTop: 5,
  },
  movieRating: {
    color: '#999999',
    alignSelf: 'flex-end',
    margin: 4,
    fontSize: 11,
    fontStyle: 'italic',
  },
  genres: {
    marginBottom: 14,
  },
  genre: {
    color: '#999999',
    alignSelf: 'flex-end',
    margin: 4,
    fontSize: 13,
    fontStyle: 'italic',
  },
});
