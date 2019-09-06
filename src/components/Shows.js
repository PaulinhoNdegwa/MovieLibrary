import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  Platform,
  RefreshControl,
} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Button,
  Form,
  Picker,
  Item,
  Icon,
} from 'native-base';

import {
  fetchShows,
  searchShows,
} from '../redux/actionCreators/fetchMoviesActions';

class Shows extends Component {
  state = {
    filterBy: 'trending',
    searchText: '',
    refreshing: false,
  };

  componentDidMount() {
    const {fetchAllShows} = this.props;
    const {filterBy} = this.state;
    fetchAllShows(filterBy);
  }

  _onRefresh = () => {
    this.setState({refreshControl: true});
    const {fetchAllShows} = this.props;
    const {filterBy} = this.state;
    fetchAllShows(filterBy);
    this.setState({refreshing: false});
  };

  handleSelectValueChange = item => {
    const {fetchAllShows} = this.props;
    this.setState(
      {
        filterBy: item,
      },
      fetchAllShows(item),
    );
  };

  handleShowsSearch = () => {
    const {searchShows} = this.props;
    const {searchText, filterBy} = this.state;
    searchShows(searchText, filterBy);
  };

  renderMovieItems = movies => {
    const mappedMovies =
      movies.length !== 0 ? (
        movies.map(movie => {
          return (
            <Card key={movie._id}>
              <CardItem
                button
                onPress={() =>
                  this.props.navigation.navigate('Show', {showId: movie._id})
                }>
                <Image
                  source={{
                    uri: movie.images.poster ? movie.images.poster : '',
                  }}
                  style={styles.showPoster}
                  resizeMode="cover"
                />
              </CardItem>
              <CardItem>
                <View style={styles.movieDetailsBox}>
                  <Text style={styles.movieDetailsTitle}>{movie.title}</Text>
                  <Text note>{movie.year}</Text>

                  {movie.num_seasons ? (
                    <Text style={styles.movieDetailsText}>
                      {movie.num_seasons} Seasons{' '}
                    </Text>
                  ) : null}
                </View>
              </CardItem>
            </Card>
          );
        })
      ) : (
        <View style={styles.noMoviesContainer}>
          <Text>No shows found</Text>
        </View>
      );
    return mappedMovies;
  };
  render() {
    const {loading, shows} = this.props;
    const {filterBy, searchText, refreshing} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this._onRefresh}
              refreshing={refreshing}
            />
          }>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                selectedValue={filterBy}
                style={{height: 50, width: '100%', marginTop: 4}}
                placeholder="Filter your shows"
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
              placeholder="Search Shows"
              value={searchText}
              onChangeText={text => this.setState({searchText: text})}
            />
            <Button
              onPress={this.handleShowsSearch}
              style={styles.searchButton}>
              <Text>Search</Text>
            </Button>
          </View>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            this.renderMovieItems(shows)
          )}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = ({fetchMoviesReducer}) => ({
  loading: fetchMoviesReducer.loading,
  shows: fetchMoviesReducer.shows,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAllShows: params => dispatch(fetchShows(params)),
    searchShows: (text, filterBy) => dispatch(searchShows(text, filterBy)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shows);

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
  showPoster: {
    height: Platform.OS === 'ios' ? 500 : 700,
    width: '100%',
  },
  movieDetailsBox: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  movieDetailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  movieDetailsText: {
    fontSize: 14,
    marginTop: 3,
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
    fontSize: 13,
  },
});
