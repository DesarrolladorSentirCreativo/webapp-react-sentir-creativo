import { Alert, type AlertColor, Snackbar, Typography } from '@mui/material'
import React from 'react'

interface NotificationProps {
  open: boolean
  msg: string
  severity: AlertColor | undefined
  handleClose: () => void
}

const Notification: React.FC<NotificationProps> = ({ msg, open, handleClose, severity }) => {
  return <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={4000} open={open}
                     onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
            <Typography>{msg}</Typography>
        </Alert>
    </Snackbar>
}

export default Notification
