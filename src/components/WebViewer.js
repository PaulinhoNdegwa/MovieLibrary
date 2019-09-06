import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

class WebViewer extends Component {
  render() {
    const {url} = this.props.navigation.state.params;
    return (
      <WebView
        source={{uri: url}}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator size="large" style={styles.webLoader} />
        )}
      />
    );
  }
}
export default WebViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
