import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Welcome from './src/components/Welcome';
import Feed from './src/components/Feed';
import Shows from './src/components/Shows';
import ShowDetails from './src/components/ShowDetails';
import MovieDetails from './src/components/MovieDetails';
import WebViewer from './src/components/WebViewer';

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: () => {
      return {
        headerTitle: 'My Movies',
        headerStyle: {
          height: Platform.OS === 'android' ? 20 : 60,
        },
      };
    },
  },
  Movie: {
    screen: MovieDetails,
    navigationOptions: () => {
      return {
        headerTitle: ' Movie Details',
        headerStyle: {
          height: Platform.OS === 'android' ? 40 : 60,
        },
      };
    },
  },
  Web: {
    screen: WebViewer,
    navigationOptions: () => {
      return {
        headerTitle: ' Trailer',
        headerStyle: {
          height: Platform.OS === 'android' ? 40 : 60,
        },
      };
    },
  },
});

const ShowsStack = createStackNavigator({
  Shows: {
    screen: Shows,
    navigationOptions: () => {
      return {
        headerTitle: 'My Shows',
        headerStyle: {
          height: Platform.OS === 'android' ? 40 : 60,
        },
      };
    },
  },
  Show: {
    screen: ShowDetails,
    navigationOptions: () => {
      return {
        headerTitle: ' Show Details',
        headerStyle: {
          height: Platform.OS === 'android' ? 40 : 60,
        },
      };
    },
  },
});

const AppBottomTabNavigator = createBottomTabNavigator(
  {
    Movies: {
      screen: FeedStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="film" color={tintColor} style={styles.bottomTabIcon} />
        ),
      },
    },
    Shows: {
      screen: ShowsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="film" color={tintColor} style={styles.bottomTabIcon} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#007aff',
      inactiveTintColor: 'gray',
      showIcon: true,
      style: {
        paddingBottom: 15,
        paddingTop: 15,
        height: 60,
        fontSize: 25,
      },
    },
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: {screen: Welcome},
  Home: {screen: AppBottomTabNavigator},
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;

const styles = StyleSheet.create({
  bottomTabIcon: {
    fontSize: 17,
  },
});
