const hasChildren = (item: any): boolean => {
  const { items: children } = item

  if (children === undefined) {
    return false
  }

  if (children.constructor !== Array) {
    return false
  }

  return children.length !== 0
}

export { hasChildren }
