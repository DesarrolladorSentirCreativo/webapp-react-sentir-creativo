import { Button } from '@mui/material'
import React from 'react'

import { type AppButtonColor, type AppButtonType, type AppButtonVariant } from '../../../../models'

interface Props {
  text: string
  variant: AppButtonVariant
  color: AppButtonColor
  type: AppButtonType
}

const AppButton: React.FC<Props> = (props) => {
  const { variant, color, text, type } = props
  return (
      <Button variant={variant} color={color} type={type}>{text}</Button>
  )
}

export default AppButton
