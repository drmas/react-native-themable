import { getDisplayName, isFunction, get } from './utils'

export default class StyleFinder {
  constructor (theme) {
    this.theme = theme
  }

  getStyle (style, component) {
    if (isFunction(style)) {
      return style(component)
    } else {
      return style
    }
  }

  // Text
  getByType (displayName) {
    return this.getStyle(get(this.theme, displayName))
  }

  // styleName
  getByStyleName (styleName) {
    return this.getStyle(get(this.theme, styleName))
  }

  // styleName[2]
  getByStyleNameAndIndex (styleName, index) {
    return this.getStyle(get(this.theme, `${styleName}[${index}]`))
  }

  getByParentStyleName (parentStyle, displayName, styleName) {
    return {
      // parent *
      ...this.getStyle(get(this.theme, `${parentStyle} *`)),
      // parent Text
      ...this.getStyle(get(this.theme, `${parentStyle} ${displayName}`)),
      // parent style
      ...this.getStyle(get(this.theme, `${parentStyle} ${styleName}`))
    }
  }

  getByParentStyleNameAndIndex (parentStyle, displayName, styleName, index) {
    return {
      // parent *[2]
      ...this.getStyle(get(this.theme, `${parentStyle} *[${index}]`)),
      // parent Text[2]
      ...this.getStyle(
        get(this.theme, `${parentStyle} ${displayName}[${index}]`)
      ),
      // parent style[2]
      ...this.getStyle(
        get(this.theme, `${parentStyle} ${styleName}[${index}]`)
      )
    }
  }

  findStyleForComponent (component, parent, index) {
    const displayName = getDisplayName(component)
    const componentStyleName = get(component, 'props.styleName')
    const parentStyleName = get(parent, 'props.styleName')

    return {
      ...this.getByType(displayName),
      ...this.getByParentStyleName(
        parentStyleName,
        displayName,
        componentStyleName
      ),
      ...this.getByParentStyleNameAndIndex(
        parentStyleName,
        displayName,
        componentStyleName
      ),
      ...this.getByStyleName(componentStyleName),
      ...this.getByStyleNameAndIndex(componentStyleName)
    }
  }
}
