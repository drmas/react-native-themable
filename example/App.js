import React from 'react'
import { StyleSheet, Text, View as RNView } from 'react-native'
import { ThemeProvider, WithTheme } from 'react-themable'

const View = WithTheme(RNView)

ThemeProvider.setCurrentTheme({
  Text: {
    style: {
      color: 'red'
    }
  },
  homeText: {
    style: {
      color: 'blue'
    }
  },
  'Text[2]': {
    style: {
      color: 'yellow'
    }
  },
  'homeContainer *': {
    style: {
      backgroundColor: 'gray'
    }
  },
  'homeContainer *[2]': {
    style: {
      backgroundColor: 'transparent'
    }
  }
})

class App extends React.Component {
  changeTheme = () => {
    ThemeProvider.setCurrentTheme({
      Text: {
        style: {
          color: 'green'
        }
      }
    })
  }
  render () {
    return (
      <View style={styles.container} styleName='homeContainer'>
        <Text styleName='homeText' onPress={this.changeTheme}>
          Open up App.js to start working on your app!
        </Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <View style={{ width: 100, height: 100 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
