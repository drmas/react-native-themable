import { isFunction } from 'lodash'

class ThemeProvider {
  constructor () {
    this.currentTheme = null
    this.observers = new Set()
  }

  getCurrentTheme () {
    return this.currentTheme
  }

  setCurrentTheme (theme) {
    this.currentTheme = theme

    this.observers.forEach(observer => {
      observer()
    })
  }

  observe (observer) {
    if (!isFunction(observer)) {
      return
    }

    this.observers.add(observer)

    return () => this.observers.delete(observer)
  }
}

export default new ThemeProvider()
