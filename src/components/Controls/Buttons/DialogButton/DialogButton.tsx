import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import React from 'react'

interface IDialogButton {
  open: boolean
  onClose: () => void
  title: string
  message: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm: () => void
}
const DialogButton: React.FC<IDialogButton> = (props: IDialogButton) => {
  const {
    open,
    onClose,
    title,
    message,
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar',
    onConfirm
  } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelButtonText}</Button>
        <Button
          variant="contained"
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogButton
