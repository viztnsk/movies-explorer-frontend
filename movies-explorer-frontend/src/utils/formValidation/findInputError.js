export function findInputError(errors, name) {
  const filtered = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce((acc, key) => {
      return Object.assign(acc, { error: errors[key] })
    }, {})
  return filtered
}