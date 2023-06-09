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
import useAcuerdoUserAdmin from '../../hooks/useAcuerdoUserAdmin'
import usePrivilegio from '../../hooks/usePrivilegio'
import { type ICreateRol } from '../../models'
import rolService from '../../services/rol.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const CreateFormRol: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)
  const { acuerdosUserAdmins, loadAcuerdoUserAdmins } = useAcuerdoUserAdmin()
  const { privilegios, loadPrivilegios } = usePrivilegio()

  useEffect(() => {
    loadForm()
  }, [])

  const loadForm = async (): Promise<void> => {
    setIsLoading(true)
    getUserId()
    await loadAcuerdoUserAdmins()
    await loadPrivilegios()
    setIsLoading(false)
  }
  const formik = useFormik<ICreateRol>({
    initialValues: {
      nombre: '',
      descripcion: '',
      acuerdos: [],
      privilegios: []
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
        .max(1024, 'La descripcion no debe superar los 1024 caracteres'),
      acuerdos: yup
        .array()
        .min(1, 'Debe seleccionar al menos un acuerdo')
        .required('Los acuerdos son obligatorios'),
      privilegios: yup
        .array()
        .min(1, 'Debe seleccionar al menos un privilegio')
        .required('Los privilegios son obligatorios')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await rolService.create(values, userId)
        getSuccess('El rol fue creado correctamente')
        navigate('/roles')
      } catch (e) {
        console.log(e)
        getError('El rol no pudo ser creado')
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
            Formulario para Creación de Roles
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
            <Grid item xs={12} sm={6} md={6}>
              <Autocomplete
                multiple
                disablePortal
                fullWidth
                size="small"
                id="acuerdoId"
                options={acuerdosUserAdmins}
                value={acuerdosUserAdmins.filter((acuerdoUserAdmin) =>
                  formik.values.acuerdos.some(
                    (selected) => selected.acuerdoId === acuerdoUserAdmin.id
                  )
                )}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    acuerdoId: option.id
                  }))
                  formik.setFieldValue('acuerdos', newValues)
                }}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Acuerdos"
                    error={!!formik.errors.acuerdos}
                    helperText={
                      formik.touched.acuerdos &&
                      formik.errors.acuerdos?.toString()
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Autocomplete
                multiple
                disablePortal
                fullWidth
                size="small"
                id="acuerdoId"
                options={privilegios}
                value={privilegios.filter((privilegio) =>
                  formik.values.privilegios.some(
                    (selected) => selected.privilegioId === privilegio.id
                  )
                )}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    privilegioId: option.id
                  }))
                  formik.setFieldValue('privilegios', newValues)
                }}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Privilegios"
                    error={!!formik.errors.privilegios}
                    helperText={
                      formik.touched.privilegios &&
                      formik.errors.privilegios?.toString()
                    }
                  />
                )}
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
                  navigate('/roles')
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

export default CreateFormRol
