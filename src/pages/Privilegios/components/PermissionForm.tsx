import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import { type Dispatch, type FC, type SetStateAction, useEffect } from 'react'

import {
  type IAccesos,
  type IColeccionUserAdminCheckBox,
  type IModuloCheckBox
} from '../../../models'

interface PermissionFormProps {
  data: IModuloCheckBox[]
  selectedAccesos: Record<number, IAccesos>
  setSelectedAccesos: Dispatch<SetStateAction<Record<number, IAccesos>>>
}

const PermissionForm: FC<PermissionFormProps> = ({
  data,
  selectedAccesos,
  setSelectedAccesos
}) => {
  const handleSelectAll = (collectionId: number): void => {
    const currentAccesos = selectedAccesos[collectionId] || {}
    const allAccesosSelected = Object.values(currentAccesos).every(
      (selected) => selected === true
    )

    const updatedAccesos: IAccesos = {
      crear: !allAccesosSelected,
      ver: !allAccesosSelected,
      actualizar: !allAccesosSelected,
      eliminar: !allAccesosSelected
    }

    setSelectedAccesos((prevState) => ({
      ...prevState,
      [collectionId]: updatedAccesos
    }))
  }

  useEffect(() => {
    if (Object.keys(selectedAccesos).length <= 0) {
      const initialValues: Record<string, IAccesos> = {}
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
      setSelectedAccesos(initialValues)
    }
  }, [data])

  const handleAccesoChange = (
    collectionId: number,
    accesoKey: keyof IAccesos
  ): void => {
    setSelectedAccesos((prevState) => ({
      ...prevState,
      [collectionId]: {
        ...prevState[collectionId],
        [accesoKey]: !prevState[collectionId][accesoKey]
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
                          selectedAccesos[collection.id] || {}
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
                        handleAccesoChange(collection.id, 'crear')
                      }}
                      checked={selectedAccesos[collection.id]?.crear || false}
                    />
                  }
                  label="Crear"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handleAccesoChange(collection.id, 'ver')
                      }}
                      checked={selectedAccesos[collection.id]?.ver || false}
                    />
                  }
                  label="Ver"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handleAccesoChange(collection.id, 'actualizar')
                      }}
                      checked={
                        selectedAccesos[collection.id]?.actualizar || false
                      }
                    />
                  }
                  label="Actualizar"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => {
                        handleAccesoChange(collection.id, 'eliminar')
                      }}
                      checked={
                        selectedAccesos[collection.id]?.eliminar || false
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
