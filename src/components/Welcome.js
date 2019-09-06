import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

class Welcome extends Component {
  redirect = () => {
    this.props.navigation.navigate('Movies');
  };
  render() {
    setTimeout(this.redirect, 1000);
    return (
      <ImageBackground
        source={require('../assets/recording_cam.jpg')}
        style={styles.splashImage}>
        <View style={styles.container}>
          <Text style={styles.header}>MovieLib</Text>
          <Text style={styles.description}>Your ultimate movie collection</Text>
          <ActivityIndicator size="large" style={styles.loader} color="white" />
        </View>
      </ImageBackground>
    );
  }
}
export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: 200,
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
  },
  description: {
    marginTop: 7,
    fontSize: 15,
    fontStyle: 'italic',
    color: 'white',
    fontWeight: '800',
  },
  loader: {
    marginTop: 15,
  },
});
