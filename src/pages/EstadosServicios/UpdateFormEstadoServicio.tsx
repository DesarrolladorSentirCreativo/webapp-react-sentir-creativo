import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { type FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import {
  type IUpdateEstadoServicio,
  type IUserAdminPermisos
} from '../../models'
import estadoServicioService from '../../services/estadoServicio.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const UpdateFormEstadoServicio: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    loadData(id)
  }, [])

  const loadEstadoServicioData = async (
    estadoServicio: IUpdateEstadoServicio
  ): Promise<void> => {
    formik.setValues({
      id: estadoServicio.id,
      nombre: estadoServicio.nombre,
      color: estadoServicio.color,
      descripcion: estadoServicio.descripcion
    })
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 33
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
        const estadoUserAdmin = await estadoServicioService.getById(
          parseInt(id ?? '0')
        )
        await loadEstadoServicioData(estadoUserAdmin)
        getUserId()
      } else {
        navigate('/home')
      }
    } catch (error) {
      console.log('Mi error', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formik = useFormik<IUpdateEstadoServicio>({
    initialValues: {
      id: 0,
      nombre: '',
      color: '',
      descripcion: ''
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(255, 'El nombre no debe superar los 255 caracteres')
        .required('El nombre es obligatorio'),
      color: yup
        .string()
        .trim()
        .min(7, 'El color debe tener 7 caracteres')
        .max(7, 'El color no debe superar los 7 caracteres')
        .required('El color es obligatorio'),
      descripcion: yup
        .string()
        .trim()
        .max(1024, 'La descripcion no debe superar los 1024 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await estadoServicioService.update(values, userId)
        getSuccess('El Estado de Servicio se actualizó correctamente')
        navigate('/estados-servicios')
      } catch (e) {
        console.log(e)
        getError('El Estado de Servicio no se actualizó correctamente')
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
            Formulario para Actualización de Estado de Servicio
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
              <TextField
                name="color"
                label="Color"
                fullWidth
                required
                size="small"
                value={formik.values.color}
                onChange={formik.handleChange}
                error={
                  formik.touched.color === true && Boolean(formik.errors.color)
                }
                helperText={
                  formik.touched.color === true && formik.errors.color
                }
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
                  navigate('/estados-servicios')
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

export default UpdateFormEstadoServicio
