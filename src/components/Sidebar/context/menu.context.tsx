import React, { createContext, useReducer } from 'react'

interface State {
  isMenuOpen: boolean
  expandedMenu: string | null
}

type Action =
    | { type: 'OPEN_MENU' }
    | { type: 'CLOSE_MENU' }
    | { type: 'SET_EXPANDED_MENU', payload: string | null }

type Dispatch = (action: Action) => void

const initialState: State = {
  isMenuOpen: false,
  expandedMenu: null
}

const menuReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'OPEN_MENU':
      return {
        ...state,
        isMenuOpen: true
      }
    case 'CLOSE_MENU':
      return {
        ...state,
        isMenuOpen: false
      }
    case 'SET_EXPANDED_MENU':
      return {
        ...state,
        expandedMenu: action.payload
      }
    default:
      return state
  }
}

export const MenuContext = createContext<{
  state: State
  dispatch: Dispatch
  handleMenuOpen: () => void
  handleMenuClose: () => void
  setExpandedMenu: (id: string | null) => void
}>({
      state: initialState,
      dispatch: () => undefined,
      handleMenuOpen: () => undefined,
      handleMenuClose: () => undefined,
      setExpandedMenu: (id: string | null) => undefined
    })

export const MenuProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState)

  const handleMenuOpen = (): void => {
    dispatch({ type: 'OPEN_MENU' })
  }

  const handleMenuClose = (): void => {
    dispatch({ type: 'CLOSE_MENU' })
  }

  const setExpandedMenu = (id: string | null): void => {
    dispatch({ type: 'SET_EXPANDED_MENU', payload: id })
  }

  return (
        <MenuContext.Provider
            value={{
              state,
              dispatch,
              handleMenuOpen,
              handleMenuClose,
              setExpandedMenu
            }}
        >
            {children}
        </MenuContext.Provider>
  )
}
