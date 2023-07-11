import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { type FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import { type IUserAdminPermisos } from '../../models'
import { type IFormato, type IUpdateFormato } from '../../models/formato'
import formatoService from '../../services/formato.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const UpdateFormFormato: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 34
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
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

  const loadSucursalData = async (formato: IFormato): Promise<void> => {
    formik.setValues({
      id: formato.id,
      nombre: formato.nombre
    })
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    const tecnicaArtistica = await formatoService.getById(parseInt(id ?? '0'))
    await loadSucursalData(tecnicaArtistica)
  }

  const formik = useFormik<IUpdateFormato>({
    initialValues: {
      id: 0,
      nombre: ''
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(255, 'El nombre no debe superar los 255 caracteres')
        .required('El nombre es obligatorio')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await formatoService.update(values, userId)
        getSuccess('El formato se actualizó correctamente')
        navigate('/formatos')
      } catch (e) {
        console.log(e)
        getError('El formato no se actualizó correctamente')
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
            Formulario para Actualización de Formato
          </Typography>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={12} md={12}>
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
                  navigate('/formatos')
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

export default UpdateFormFormato
