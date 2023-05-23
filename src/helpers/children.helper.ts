import { type RouteType } from '../models'

const hasChildren = (item: RouteType): boolean => {
  const { children } = item

  if (children === undefined) {
    return false
  }

  if (children.constructor !== Array) {
    return false
  }

  return children.length !== 0
}

export { hasChildren }
