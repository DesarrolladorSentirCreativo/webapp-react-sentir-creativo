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
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { useDireccion } from '../../hooks'
import { type SelectCiudad } from '../../models'
import { type ISucursal, type IUpdateSucursal } from '../../models/sucursal'
import sucursalService from '../../services/sucursal.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const UpdateFormSucursal: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { paises, loadPaises, regiones, loadRegiones, ciudades, loadCiudades } =
    useDireccion()
  const [ciudad, setCiudad] = useState<SelectCiudad[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()

  useEffect(() => {
    setIsLoading(true)
    loadData(id)
    if (paises.length <= 0) loadPaises()

    if (regiones.length <= 0) loadRegiones()

    if (ciudades.length <= 0) loadCiudades()
    setIsLoading(false)
  }, [])

  const searchCiudades = (value: number): void => {
    const result = ciudades.filter((c) => c.regionId === value)
    if (result) {
      setCiudad(result)
    }
  }

  const loadSucursalData = async (sucursal: ISucursal): Promise<void> => {
    searchCiudades(sucursal.regionId)
    formik.setValues({
      id: sucursal.id,
      nombre: sucursal.nombre,
      ciudadId: sucursal.ciudadId,
      paisId: sucursal.paisId,
      regionId: sucursal.regionId,
      direccion: sucursal.direccion,
      descripcion: sucursal.descripcion
    })
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    const sucursal = await sucursalService.getById(parseInt(id ?? '0'))
    await loadSucursalData(sucursal)
  }

  const formik = useFormik<IUpdateSucursal>({
    initialValues: {
      id: 0,
      nombre: '',
      ciudadId: 0,
      direccion: '',
      regionId: 0,
      descripcion: '',
      paisId: 0
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
        await sucursalService.update(values)
        getSuccess('La sucursal se actualizó correctamente')
        navigate('/sucursales')
      } catch (e) {
        console.log(e)
        getError('La sucursal no se actualizó correctamente')
        setIsLoading(false)
      }
    }
  })
  if (isLoading) {
    return <SkeletonFormOrganizacion />
  } else {
    return (
      <Card title="Formulario">
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Formulario para Actualización de Sucursal
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
                value={
                  paises.find((pais) => pais.id === formik.values.paisId) ??
                  null
                }
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
                value={
                  regiones.find(
                    (region) => region.id === formik.values.regionId
                  ) ?? null
                }
                onChange={(event, value) => {
                  console.log('region', value)
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
                value={
                  ciudades.find(
                    (ciudad) => ciudad.id === formik.values.ciudadId
                  ) ?? null
                }
                onChange={(event, value) => {
                  console.log('value', value)
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
                  navigate('/sucursales')
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

export default UpdateFormSucursal
