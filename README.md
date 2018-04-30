
# react-themable

## Getting started

`$ npm install react-themable --save`

or

`yarn add react-themable`

## Example
```javascript
import React from 'react'
import { StyleSheet, Text, View as RNView } from 'react-native'
import { ThemeProvider, WithTheme } from 'react-themable'

// extend React Native View to support theming
const View = WithTheme(RNView)

// Define your theme here
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
```
  
## API

### ThemeProvider

Use to set the current theme, or change it at any time, it has the following apis

| API        | Params           | Usage
| ------------- |:-------------:| -----:|
| getCurrentTheme      | - | Return the current theme |
| setCurrentTheme      | ```{ [styleName:string]: { style: [string]: value} } }```     |   Set the current theme, and notify all component to rerender to apply theme |
| observe | observer:Function -> unobserve:function      |    Use it to listen for theme changes |


### WithTheme

High order component that allow the component to listen to theme changes, as well as apply theme styles to all its direct children.

Usually you will need it to decorate the React Native View, or React div component

```
import { View as RNView } from 'react-native'
import { WithTheme } from 'react-themable'

// extend React Native View to support theming
const View = WithTheme(RNView)
```

### Theme

Theme itself is a JS object that maps styles with its name to their values.

You can define style using on of the following:

1. Type name ```Text``` or ```View``` or any valid type name

2. Stylename which is added to component as ```styleName``` property ```<View styleName='homeContainer'>```

3. Component Index, you can combine tepe or style name with target element index ```Text[2]``` for example with apply style to Text compnent that is in the 3rd index of its parent

4. Parent style name can be used in combination with ```*``` to target any child, or you can add index to target specific element in specific index ```*[2]```


## Rules

Theme style is applied in a specific order from top to bottom:

- Type style ex. ```Text```
- ParentStyle with * ex. ```parentStyle *```
- ParentStyle with Type ex. ```parentStyle Text```
- ParentStyle with Stylename ex. ```parentStyle stylename```
- ParentStyle with * and index ex. ```parentStyle *[2]```
- ParentStyle with Type and index ex. ```parentStyle Text[3]```
- ParentStyle with Stylename and index ex. ```parentStyle stylename[1]```
- Stylename ex. ```stylename```
- Stylename with index ex. ```stylename[3]```

