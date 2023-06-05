import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material'
import { type ChangeEvent, type FC, useState } from 'react'

import { type IModuloCheckBox } from '../../../models'

interface PermissionFormProps {
  data: IModuloCheckBox[]
}

const PermissionForm: FC<PermissionFormProps> = ({ data }) => {
  const [selectAll, setSelectAll] = useState<boolean>(false)

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // Lógica para manejar los cambios en los checkboxes
  }

  const handleSelectAllChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectAll(event.target.checked)
  }

  return (
    <>
      <Typography variant="body1" gutterBottom>
        Permisos
      </Typography>

      {data.map((module) => (
        <Box key={module.id} sx={{ marginLeft: 3, padding: 3 }}>
          <Typography variant="overline" display="block" gutterBottom>
            {module.nombre}
          </Typography>

          {module.colecciones.map((collection) => (
            <Box key={collection.id} sx={{ marginLeft: 5, padding: 3 }}>
              <Typography variant="body2" gutterBottom>
                {collection.nombre}
              </Typography>

              <FormGroup>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: '20px' }}>
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
                      label="Eliminar"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckboxChange} />}
                      label="Listar"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleCheckboxChange} />}
                      label="Actualizar"
                    />
                  </div>
                </div>
              </FormGroup>
            </Box>
          ))}
        </Box>
      ))}
    </>
  )
}

export default PermissionForm
