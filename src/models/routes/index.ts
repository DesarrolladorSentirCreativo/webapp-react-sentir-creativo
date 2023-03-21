import { type ReactNode } from 'react'

interface RouteType {
  id: string
  title: string
  icon?: ReactNode
  path: string
  children: []
}

export type { RouteType }
