import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import { type ChangeEvent, type FC } from 'react'

import { type IModuloCheckBox } from '../../../models'

interface PermissionFormProps {
  data: IModuloCheckBox[]
}

const PermissionForm: FC<PermissionFormProps> = ({ data }) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // Lógica para manejar los cambios en los checkboxes
  }

  return (
    <>
      {data.map((module) => (
        <Box key={module.id} sx={{ marginBottom: '24px' }}>
          <Typography variant="h6" gutterBottom>
            {module.nombre}
          </Typography>
          {module.colecciones.map((collection) => (
            <Box key={collection.id} sx={{ marginBottom: '16px' }}>
              <Typography variant="subtitle1" gutterBottom>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ flexGrow: 1 }}> {collection.nombre}</span>
                  <FormControlLabel
                    control={<Checkbox onChange={handleCheckboxChange} />}
                    label="Seleccionar todo"
                  />
                </div>
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label="Crear"
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label="Ver"
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
                  label="Actualizar"
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleCheckboxChange} />}
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
