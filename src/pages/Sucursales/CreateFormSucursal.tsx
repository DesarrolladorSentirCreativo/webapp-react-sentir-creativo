import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useNotification } from '../../context'
import { useDireccion } from '../../hooks'
import { type SelectCiudad } from '../../models'
import { type ICreateSucursal } from '../../models/sucursal'
import sucursalService from '../../services/sucursal.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'
import Card from './../../components/Controls/Card/Card'

const CreateFormSucursal: React.FC = () => {
  const { paises, loadPaises, regiones, loadRegiones, ciudades, loadCiudades } =
    useDireccion()
  const navigate = useNavigate()
  const [ciudad, setCiudad] = useState<SelectCiudad[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()

  useEffect(() => {
    setIsLoading(true)

    if (paises.length <= 0) loadPaises()

    if (regiones.length <= 0) loadRegiones()

    if (ciudades.length <= 0) loadCiudades()
    setIsLoading(false)
  }, [])

  const formik = useFormik<ICreateSucursal>({
    initialValues: {
      nombre: '',
      ciudadId: 0,
      regionId: 0,
      paisId: 0,
      direccion: '',
      descripcion: ''
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(200, 'El nombre no debe superar los 255 caracteres')
        .required('El nombre es obligatorio'),
      facebook: yup
        .string()
        .trim()
        .max(255, 'El facebook no debe superar los 255 caracteres'),
      ciudadId: yup.number().required('La ciudad es obligatoria'),
      paisId: yup.number().required('El pais es obligatorio'),
      regionId: yup.number().required('La region es obligatorio'),
      direccion: yup
        .string()
        .trim()
        .max(255, 'La direccion no debe superar los 1024 caracteres'),
      descripcion: yup
        .string()
        .trim()
        .max(255, 'La descripcion no debe superar los 1024 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await sucursalService.create(values)
        getSuccess('La sucursal fue creada correctamente')
        navigate('/sucursales')
      } catch (e) {
        console.log(e)
        getError('La sucursal no pudo ser creada')
        setIsLoading(false)
      }
    }
  })

  const searchCiudades = (value: number): void => {
    const result = ciudades.filter((c) => c.regionId === value)
    setCiudad(result)
  }

  if (isLoading) {
    return <SkeletonFormOrganizacion />
  } else {
    return (
      <Card title="Formulario">
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Formulario para Creación de Sucursal
          </Typography>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={6} md={4}>
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
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="direccion"
                label="Dirección"
                fullWidth
                required
                size="small"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                error={
                  formik.touched.direccion === true &&
                  Boolean(formik.errors.direccion)
                }
                helperText={
                  formik.touched.direccion === true && formik.errors.direccion
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="pais"
                options={paises}
                onChange={(event, value) => {
                  formik.setFieldValue('paisId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="País"
                    required
                    value={formik.values.paisId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="region"
                options={regiones}
                onChange={(event, value) => {
                  formik.setFieldValue('regionId', value?.id ?? null)
                  if (value !== undefined || value !== null) {
                    searchCiudades(value !== null ? value.id : 0)
                  }
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Región"
                    required
                    value={formik.values.regionId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="ciudad"
                options={ciudad}
                onChange={(event, value) => {
                  formik.setFieldValue('ciudadId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Ciudad"
                    required
                    value={formik.values.ciudadId}
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
                  navigate('/organizaciones')
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

export default CreateFormSucursal
