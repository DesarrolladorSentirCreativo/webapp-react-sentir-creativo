import { Paper } from '@mui/material'
import React from 'react'

interface Props {
  title: string
  children?: React.ReactNode
}

const Card: React.FC<Props> = (props) => {
  const { children } = props

  return (
      <Paper sx={{ padding: '1.2em', height: '100vh', width: '100%' }}>
          {children}
      </Paper>
  )
}

export default Card
