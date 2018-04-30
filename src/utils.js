export const getDisplayName = WrappedComponent => {
  return (
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    (WrappedComponent.type && WrappedComponent.type.displayName)
  )
}
