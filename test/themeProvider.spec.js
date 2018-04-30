import ThemeProvider from '../src/themeProvider'
import expect from 'expect.js'
import sinon from 'sinon'

describe('Theme provider', () => {
  it('save and retrieve theme', () => {
    const theme = {}

    ThemeProvider.setCurrentTheme(theme)

    expect(ThemeProvider.getCurrentTheme()).to.be(theme)
  })

  it('notifiy on theme change', () => {
    const theme = {}
    ThemeProvider.setCurrentTheme(theme)

    const observer = sinon.spy()

    ThemeProvider.observe(observer)

    ThemeProvider.setCurrentTheme({})

    expect(observer.calledOnce).to.be(true)
  })

  it('remove observer', () => {
    const theme = {}
    ThemeProvider.setCurrentTheme(theme)

    const observer = sinon.spy()

    const removeObserver = ThemeProvider.observe(observer)
    removeObserver()

    ThemeProvider.setCurrentTheme({})

    expect(observer.notCalled).to.be(true)
  })
})
