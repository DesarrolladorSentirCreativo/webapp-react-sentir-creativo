import { type ReactNode } from 'react'

interface RouteType {
  id: string
  title: string
  icon?: ReactNode
  coleccion?: number
  modulo?: number
  path?: string
  children?: RouteType[]
}

export type { RouteType }
