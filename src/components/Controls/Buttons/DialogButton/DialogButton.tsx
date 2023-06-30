import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import React, { useState } from 'react'

interface IDialogButton {
  open: boolean
  onClose: () => void
  title: string
  message: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm: () => Promise<void>
}
const DialogButton: React.FC<IDialogButton> = (props: IDialogButton) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    open,
    onClose,
    title,
    message,
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar',
    onConfirm
  } = props

  const handleClick = async (): Promise<void> => {
    setIsLoading(true)
    await onConfirm()
    setIsLoading(false)
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          {cancelButtonText}
        </Button>
        <Button
          disabled={isLoading}
          variant="contained"
          onClick={() => {
            handleClick()
          }}
        >
          {isLoading ? 'Cargando...' : confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogButton
