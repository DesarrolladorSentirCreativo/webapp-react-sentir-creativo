import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import { type FC, useEffect, useState } from 'react'

import {
  type IColeccionUserAdminCheckBox,
  type IModuloCheckBox
} from '../../../models'

interface PermissionFormProps {
  data: IModuloCheckBox[]
}

interface Privileges {
  crear: boolean
  ver: boolean
  actualizar: boolean
  eliminar: boolean
}

const PermissionForm: FC<PermissionFormProps> = ({ data }) => {
  const [selectedPrivileges, setSelectedPrivileges] = useState<
    Record<number, Privileges>
  >({})

  const handleSelectAll = (collectionId: number): void => {
    const currentPrivileges = selectedPrivileges[collectionId] || {}
    const allPrivilegesSelected = Object.values(currentPrivileges).every(
      (selected) => selected === true
    )

    const updatedPrivileges: Privileges = {
      crear: !allPrivilegesSelected,
      ver: !allPrivilegesSelected,
      actualizar: !allPrivilegesSelected,
      eliminar: !allPrivilegesSelected
    }

    setSelectedPrivileges((prevState) => ({
      ...prevState,
      [collectionId]: updatedPrivileges
    }))
  }

  useEffect(() => {
    const initialValues: Record<string, Privileges> = {}
    data.forEach((modulo) => {
      modulo.colecciones.forEach((coleccion) => {
        initialValues[coleccion.id] = {
          crear: false,
          ver: false,
          actualizar: false,
          eliminar: false
        }
      })
    })
    setSelectedPrivileges(initialValues)
  }, [data])

  const handlePrivilegeChange = (
    collectionId: number,
    privilegeKey: keyof Privileges
  ): void => {
    setSelectedPrivileges((prevState) => ({
      ...prevState,
      [collectionId]: {
        ...prevState[collectionId],
        [privilegeKey]: !prevState[collectionId][privilegeKey]
      }
    }))
  }
  return (
    <>
      {data.map((module: IModuloCheckBox) => (
        <Box key={module.id} sx={{ marginBottom: '24px' }}>
          <Typography variant="h6" gutterBottom>
            {module.nombre}
          </Typography>
          {module.colecciones.map((collection: IColeccionUserAdminCheckBox) => (
            <Box key={collection.id} sx={{ marginBottom: '16px' }}>
              <Typography variant="subtitle1" gutterBottom>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ flexGrow: 1 }}>{collection.nombre}</span>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          handleSelectAll(collection.id)
                        }}
                        checked={Object.values(
                          selectedPrivileges[collection.id] || {}
                        ).every((selected) => selected === true)}
                      />
                    }
                    label="Seleccionar todo"
                  />
                </div>
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handlePrivilegeChange(collection.id, 'crear')
                      }}
                      checked={
                        selectedPrivileges[collection.id]?.crear || false
                      }
                    />
                  }
                  label="Crear"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handlePrivilegeChange(collection.id, 'ver')
                      }}
                      checked={selectedPrivileges[collection.id]?.ver || false}
                    />
                  }
                  label="Ver"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handlePrivilegeChange(collection.id, 'actualizar')
                      }}
                      checked={
                        selectedPrivileges[collection.id]?.actualizar || false
                      }
                    />
                  }
                  label="Actualizar"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handlePrivilegeChange(collection.id, 'eliminar')
                      }}
                      checked={
                        selectedPrivileges[collection.id]?.eliminar || false
                      }
                    />
                  }
                  label="Eliminar"
                />
              </FormGroup>
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
}

export default PermissionForm
