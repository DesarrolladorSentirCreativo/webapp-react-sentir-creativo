import { type AlertColor } from '@mui/material'
import React, { useState } from 'react'

import Notification from '../components/Notification/Notification'

interface ContextProps {
  getError: (msg: string) => void
  getSuccess: (msg: string) => void
}

const NotificationContext = React.createContext<ContextProps | null>(null)

export const NotificationProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [msg, setMsg] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined)

  const handleClose = (): void => {
    setOpen(false)
  }
  const getError = (msg: string): void => {
    setOpen(true)
    setMsg(msg)
    setSeverity('error')
  }

  const getSuccess = (msg: string): void => {
    setOpen(true)
    setMsg(msg)
    setSeverity('success')
  }

  const value = {
    getError,
    getSuccess
  }
  return (
        <NotificationContext.Provider value={value}>
            <Notification open={open} msg={msg} severity={severity} handleClose={handleClose} />
            {children}
        </NotificationContext.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useNotification = () => {
  const context = React.useContext(NotificationContext)

  if (context == null) throw new Error('No existe el contexto')

  return context
}
