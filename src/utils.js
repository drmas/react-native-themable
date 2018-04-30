export const getDisplayName = WrappedComponent => {
  return (
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    (WrappedComponent.type && WrappedComponent.type.displayName)
  )
}

export const isFunction = functionToCheck => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

export const get = (obj, path) => {
  return (
    path &&
    path.split('.').reduce((acc, k) => {
      if (acc && k in acc) return acc[k]
      return undefined
    }, obj)
  )
}
