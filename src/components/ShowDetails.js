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
import {fetchShow} from '../redux/actionCreators/fetchMoviesActions';

class ShowDetails extends Component {
  componentDidMount() {
    const {fetchShow} = this.props;
    const {showId} = this.props.navigation.state.params;
    fetchShow(showId);
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

  renderEpisodes = episodes => {
    return episodes.map(episode => {
      return <Text key={episode.tvdb_id}>{episode.title}</Text>;
    });
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
              <Text style={styles.showInfo}>Aired on {movie.network}</Text>
              <Text style={styles.showInfo}>
                {movie.air_time} {movie.air_day}
              </Text>
              <Text style={styles.showInfo}>Country: {movie.country}</Text>
              <Text style={styles.showInfo}>
                {movie.runtime} minutes/episode
              </Text>
              <Text style={styles.synopsisHeader}>Synopsis</Text>
              <Text style={styles.movieSynopsis}>{movie.synopsis}</Text>
              <Text style={styles.movieRating}>
                Rating: {movie.rating.percentage}%
              </Text>
            </View>
          </CardItem>
          {/* <CardItem>
            <View>{this.renderEpisodes(movie.episodes)}</View>
          </CardItem> */}
        </Card>
      ) : null;
    return mappedMovie;
  };

  render() {
    const {show, loading} = this.props;
    console.log(show);
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <View style={styles.container}>
        <ScrollView>{this.renderMovie(show)}</ScrollView>
      </View>
    );
  }
}
const mapStateToProps = ({fetchMoviesReducer}) => ({
  loading: fetchMoviesReducer.loading,
  show: fetchMoviesReducer.show,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchShow: params => dispatch(fetchShow(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowDetails);

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
    fontSize: 12,
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
  showInfo: {
    fontSize: 12,
    margin: 2,
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
  synopsisHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
