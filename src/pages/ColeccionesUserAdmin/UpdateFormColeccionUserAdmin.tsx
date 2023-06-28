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
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import useModulo from '../../hooks/useModulo'
import { type IColeccionUserAdmin, type IUserAdminPermisos } from '../../models'
import coleccionUserAdminService from '../../services/coleccionUserAdmin.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const UpdateFormColeccionUserAdmin: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)
  const { loadModulos, modulos } = useModulo()

  useEffect(() => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 29
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
        loadModulos()
        loadData(id)
        getUserId()
      } else {
        navigate('/home')
      }
    } catch (error) {
      console.log('Mi error', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadColeccionData = async (
    coleccion: IColeccionUserAdmin
  ): Promise<void> => {
    formik.setValues({
      id: coleccion.id,
      nombre: coleccion.nombre,
      moduloId: coleccion.moduloId,
      descripcion: coleccion.descripcion
    })
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    const modulo = await coleccionUserAdminService.getById(parseInt(id ?? '0'))
    await loadColeccionData(modulo)
  }

  const formik = useFormik<IColeccionUserAdmin>({
    initialValues: {
      id: 0,
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
        .max(1024, 'La descripcion no debe superar los 1024 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await coleccionUserAdminService.update(values, userId)
        getSuccess('La colección se actualizó correctamente')
        navigate('/colecciones')
      } catch (e) {
        console.log(e)
        getError('La colección no se actualizó correctamente')
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
            Formulario para Actualización de Colección
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
                value={
                  modulos.find(
                    (modulo) => modulo.id === formik.values.moduloId
                  ) ?? null
                }
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

export default UpdateFormColeccionUserAdmin
