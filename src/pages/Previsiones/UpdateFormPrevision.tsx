import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { type FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import { type IPrevision } from '../../models'
import previsionService from '../../services/prevision.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const UpdateFormPrevision: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)

  useEffect(() => {
    loadData(id)
  }, [])

  const loadPrevisionData = async (prevision: IPrevision): Promise<void> => {
    formik.setValues({
      id: prevision.id,
      nombre: prevision.nombre,
      descripcion: prevision.descripcion
    })
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    setIsLoading(true)
    const sucursal = await previsionService.getById(parseInt(id ?? '0'))
    await loadPrevisionData(sucursal)
    getUserId()
    setIsLoading(false)
  }

  const formik = useFormik<IPrevision>({
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
        await previsionService.update(values, userId)
        getSuccess('La Previsión se actualizó correctamente')
        navigate('/previsiones')
      } catch (e) {
        console.log(e)
        getError('La Previsión no se actualizó correctamente')
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
            Formulario para Actualización de Previsión
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
                  navigate('/previsiones')
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

export default UpdateFormPrevision
