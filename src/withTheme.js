import React from 'react'
import ThemeProvider from './themeProvider'
import { getDisplayName } from './utils'
import StyleFinder from './styleFinder'

export default (withTheme = WrappedComponent => {
  class ThemedComponent extends React.Component {
    componentDidMount = () => {
      this.unsubscribe = ThemeProvider.observe(this.update)
    }

    update = () => {
      this.forceUpdate()
    }

    componentWillUnmount = () => {
      this.unsubscribe()
    }

    render () {
      const styleFinder = new StyleFinder(ThemeProvider.getCurrentTheme())
      const _props = styleFinder.findStyleForComponent(WrappedComponent)

      return (
        <WrappedComponent
          {...this.props}
          {..._props}
          style={[this.props.style, _props.style]}
        >
          {React.Children.map(this.props.children, (child, index) => {
            const _props = styleFinder.findStyleForComponent(child, this, index)
            return React.cloneElement(child, {
              ..._props,
              style: [child.props.style, _props.style]
            })
          })}
        </WrappedComponent>
      )
    }
  }

  ThemedComponent.displayName = getDisplayName(WrappedComponent)
  return ThemedComponent
})
