import { Paper, Typography } from '@mui/material'
import React from 'react'

interface Props {
  title: string
  children?: React.ReactNode
}

const Card: React.FC<Props> = (props) => {
  const { title, children } = props

  return (
      <Paper sx={{ padding: '1.2em' }}>
          <Typography>{title}</Typography>
          {children}
      </Paper>
  )
}

export default Card
