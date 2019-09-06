import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Platform,
  TextInput,
  RefreshControl,
} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Form,
  Item,
  Picker,
  Icon,
} from 'native-base';

import {
  fetchMovies,
  searchMovies,
} from '../redux/actionCreators/fetchMoviesActions';

class Feed extends Component {
  state = {
    filterBy: 'trending',
    searchText: '',
    refreshing: false,
  };

  componentDidMount() {
    const {fetchMovies} = this.props;
    // console.log(fetchAllMovies);
    const {filterBy} = this.state;
    fetchMovies(filterBy);
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    const {fetchMovies} = this.props;
    const {filterBy} = this.state;
    fetchMovies(filterBy);
    this.setState({refreshing: false});
  };

  handleSelectValueChange = item => {
    const {fetchMovies} = this.props;
    this.setState(
      {
        filterBy: item,
      },
      fetchMovies(item),
    );
  };

  handleMovieSearch = () => {
    const {searchMovies} = this.props;
    const {searchText, filterBy} = this.state;
    searchMovies(searchText, filterBy);
  };

  renderImages = ({item}) => {
    return (
      <Image
        source={{
          uri: item,
        }}
        style={{height: 500, width: '10%'}}
      />
    );
  };

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

  renderMovieItems = movies => {
    console.log(movies);
    const mappedMovies =
      movies.length !== 0 ? (
        movies.map(movie => {
          return (
            <Card key={movie._id}>
              <CardItem
                button
                onPress={() =>
                  this.props.navigation.navigate('Movie', {movieId: movie._id})
                }>
                <Image
                  source={{
                    uri: movie.images.poster,
                  }}
                  style={styles.moviePoster}
                  resizeMode="cover"
                />
              </CardItem>
              <CardItem>
                <View style={styles.movieDetailsBox}>
                  <Text style={styles.genres}>
                    {this.renderGenres(movie.genres)}
                  </Text>
                  <Text style={styles.movieDetailsTitle}>{movie.title}</Text>
                  <Text note>{movie.year}</Text>
                  <Text style={styles.certification}>
                    Rated: {movie.certification}
                  </Text>
                  <Button
                    small
                    style={styles.trailerButton}
                    onPress={() =>
                      this.props.navigation.navigate('Web', {
                        url: movie.trailer,
                      })
                    }>
                    <Text>Watch Trailer</Text>
                  </Button>
                  <Text style={styles.rating}>
                    Rating: {movie.rating.percentage}%
                  </Text>
                </View>
              </CardItem>
            </Card>
          );
        })
      ) : (
        <View style={styles.noMoviesContainer}>
          <Text>No movies found</Text>
        </View>
      );
    return mappedMovies;
  };
  render() {
    const {loading, movies} = this.props;
    const {filterBy, searchText, refreshing} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={{width: '100%'}}
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }>
          <Form style={{width: '100%', marginTop: 2}}>
            <Item picker>
              <Picker
                mode="dropdown"
                selectedValue={filterBy}
                style={{height: 50, width: '100%'}}
                placeholder="Filter your movies"
                onValueChange={item => this.handleSelectValueChange(item)}>
                <Picker.Item label="Trending" value="trending" />
                <Picker.Item label="Popularity" value="popularity" />
                <Picker.Item label="Year" value="year" />
                <Picker.Item label="Rating" value="rating" />
                <Picker.Item label="Title" value="title" />
              </Picker>
            </Item>
          </Form>
          <View style={styles.searchView}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Movies"
              value={searchText}
              onChangeText={text => this.setState({searchText: text})}
            />
            <Button
              onPress={this.handleMovieSearch}
              style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </Button>
          </View>

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            this.renderMovieItems(movies)
          )}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = ({fetchMoviesReducer}) => ({
  loading: fetchMoviesReducer.loading,
  movies: fetchMoviesReducer.movies,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMovies: params => dispatch(fetchMovies(params)),
    searchMovies: (text, filterBy) => dispatch(searchMovies(text, filterBy)),
  };
};
export default connect(
  mapStateToProps,
  {fetchMovies, searchMovies},
)(Feed);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noMoviesContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moviePoster: {
    height: Platform.OS === 'ios' ? 500 : 700,
    width: '100%',
  },
  movieDetailsBox: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  movieDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieDetailsText: {
    fontSize: 14,
    marginTop: 3,
  },
  trailerButton: {
    marginBottom: 10,
    width: (Platform.OS = 'android' ? 155 : 120),
    marginTop: 10,
    padding: (Platform.OS = 'android' ? 5 : null),
    paddingTop: (Platform.OS = 'android' ? 7 : null),
    paddingBottom: (Platform.OS = 'android' ? 7 : null),
    borderRadius: 5,
    backgroundColor: '#003d9c',
  },
  rating: {
    color: '#999999',
    alignSelf: 'flex-end',
    margin: 4,
    fontSize: 12,
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
  certification: {
    fontSize: 13,
    marginTop: 2,
  },
  searchView: {
    width: '100%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '2%',
    paddingRight: '2%',
    marginTop: 4,
  },
  searchInput: {
    height: Platform.OS === 'ios' ? 20 : 40,
    fontSize: 14,
    width: '75%',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
  },
  searchButton: {
    width: '24%',
    height: Platform.OS === 'ios' ? 20 : 40,
    borderRadius: 5,
    backgroundColor: '#003d9c',
    marginLeft: '1%',
    display: 'flex',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 14,
  },
});
