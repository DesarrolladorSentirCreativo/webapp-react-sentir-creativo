import { useState } from 'react'

interface IUseDialogButton {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

const useDialogButton = (): IUseDialogButton => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return { open, handleOpen, handleClose }
}

export default useDialogButton
