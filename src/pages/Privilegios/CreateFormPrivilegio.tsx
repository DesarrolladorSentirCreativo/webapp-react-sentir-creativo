import { Box } from '@mui/material'
import { type FC, useEffect, useState } from 'react'

import { type IModuloCheckBox } from '../../models'
import moduloService from '../../services/modulo.service'
import Card from './../../components/Controls/Card/Card'
import { PermissionForm, SkeletonPrivilegio } from './components'

const CreateFormPrivilegio: FC = () => {
  const [permission, setPermission] = useState<IModuloCheckBox[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    loadColeccionesCheckbox()
  }, [])

  const loadColeccionesCheckbox = async (): Promise<void> => {
    setLoading(true)
    const data = await moduloService.getColecciones()
    setPermission(data)
    setLoading(false)
  }
  if (loading) {
    return <SkeletonPrivilegio />
  } else {
    return (
      <Card title="Formulario">
        <Box component="form">
          <PermissionForm data={permission} />
        </Box>{' '}
      </Card>
    )
  }
}

export default CreateFormPrivilegio
