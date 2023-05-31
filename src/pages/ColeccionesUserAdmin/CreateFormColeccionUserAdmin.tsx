import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { type FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import useModulo from '../../hooks/useModulo'
import { type ICreateColeccionUserAdmin } from '../../models'
import coleccionUserAdminService from '../../services/coleccionUserAdmin.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const CreateFormColeccionUserAdmin: FC = () => {
  const navigate = useNavigate()
  const { loadModulos, modulos } = useModulo()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    setIsLoading(true)
    getUserId()
    loadModulos()
    setIsLoading(false)
  }, [])

  const formik = useFormik<ICreateColeccionUserAdmin>({
    initialValues: {
      nombre: '',
      moduloId: 0,
      descripcion: ''
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(50, 'El nombre no debe superar los 50 caracteres')
        .required('El nombre es obligatorio'),
      moduloId: yup
        .number()
        .typeError('El modulo es obligatorio')
        .required('El modulo es obligatorio'),
      descripcion: yup
        .string()
        .trim()
        .max(1024, 'La descripción no debe superar los 1024 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await coleccionUserAdminService.create(values, userId)
        getSuccess('La colección fue creado correctamente')
        navigate('/colecciones')
      } catch (e) {
        console.log(e)
        getError('La coleccón no pudo ser creado')
        setIsLoading(false)
      }
    }
  })

  const getUserId = (): void => {
    const userData = getLocalStorage('user') || '{}'
    const user = JSON.parse(userData)
    setUserId(user.userId)
  }

  if (isLoading) {
    return <SkeletonFormOrganizacion />
  } else {
    return (
      <Card title="Formulario">
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Formulario para Creación de Colección
          </Typography>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                name="nombre"
                label="Nombre"
                fullWidth
                required
                size="small"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={
                  formik.touched.nombre === true &&
                  Boolean(formik.errors.nombre)
                }
                helperText={
                  formik.touched.nombre === true && formik.errors.nombre
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="modulo"
                options={modulos}
                getOptionLabel={(option) => option.nombre}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => {
                  formik.setFieldValue('moduloId', value?.id ?? null)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Modulo"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.moduloId}
                    error={!!formik.errors.moduloId}
                    helperText={formik.errors.moduloId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                name="descripcion"
                label="Descripción"
                fullWidth
                size="small"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                error={
                  formik.touched.descripcion === true &&
                  Boolean(formik.errors.descripcion)
                }
                helperText={
                  formik.touched.descripcion === true &&
                  formik.errors.descripcion
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Button fullWidth type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="error"
                onClick={() => {
                  navigate('/colecciones')
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    )
  }
}

export default CreateFormColeccionUserAdmin
