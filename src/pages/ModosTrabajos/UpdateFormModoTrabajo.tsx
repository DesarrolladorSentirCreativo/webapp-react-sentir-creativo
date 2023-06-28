import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { type FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import { type IModoTrabajo, type IUserAdminPermisos } from '../../models'
import modoTrabajoService from '../../services/modoTrabajo.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const UpdateFormModoTrabajo: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    loadData(id)
  }, [])

  const loadModoTrabajoData = async (
    modoTrabajo: IModoTrabajo
  ): Promise<void> => {
    formik.setValues({
      id: modoTrabajo.id,
      nombre: modoTrabajo.nombre,
      descripcion: modoTrabajo.descripcion
    })
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 23
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
        const sucursal = await modoTrabajoService.getById(parseInt(id ?? '0'))
        await loadModoTrabajoData(sucursal)
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

  const formik = useFormik<IModoTrabajo>({
    initialValues: {
      id: 0,
      nombre: '',
      descripcion: ''
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(80, 'El nombre no debe superar los 80 caracteres')
        .required('El nombre es obligatorio'),
      descripcion: yup
        .string()
        .trim()
        .max(1024, 'La descripcion no debe superar los 1024 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await modoTrabajoService.update(values, userId)
        getSuccess('El Modo de Trabajo se actualizó correctamente')
        navigate('/modos-trabajos')
      } catch (e) {
        console.log(e)
        getError('El Modo de Trabajo no se actualizó correctamente')
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
            Formulario para Actualización de Modo de Trabajo
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
                  navigate('/modos-trabajos')
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

export default UpdateFormModoTrabajo
