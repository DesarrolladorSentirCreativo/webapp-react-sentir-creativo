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
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { useDireccion, useRubro } from '../../hooks'
import {
  type OrganizacionDataGrid,
  type OrganizacionDireccion,
  type SelectCiudad,
  type UpdateOrganizacion
} from '../../models'
import { type RootState } from '../../redux/store'
import organizacionService from '../../services/organizacion.service'
import { SkeletonFormOrganizacion } from './components'

const UpdateFormOrganizacion: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { rubros, loadRubros } = useRubro()
  const { paises, loadPaises, regiones, loadRegiones, ciudades, loadCiudades } =
    useDireccion()
  const [ciudad, setCiudad] = useState<SelectCiudad[]>([])
  const organizaciones = useSelector(
    (state: RootState) => state.organizacion.data
  )
  const [isLoading, setIsLoading] = useState(false)
  const { getError, getSuccess } = useNotification()

  useEffect(() => {
    setIsLoading(true)
    loadData(id)
    loadRubros()
    loadPaises()
    loadRegiones()
    loadCiudades()
    setIsLoading(false)
  }, [])

  const searchCiudades = (value: number): void => {
    const result = ciudades.filter((c) => c.regionId === value)
    setCiudad(result)
  }

  const loadOrganizacionData = async (
    organizacionData: OrganizacionDataGrid,
    direccion: OrganizacionDireccion | null
  ): Promise<void> => {
    searchCiudades(direccion?.regionId ?? 0)
    formik.setValues({
      id: organizacionData?.id,
      nombre: organizacionData?.nombre,
      website:
        organizacionData?.website !== null ? organizacionData?.website : '',
      rubroId: organizacionData?.rubroId,
      facebook:
        organizacionData?.facebook !== null ? organizacionData?.facebook : '',
      twitter:
        organizacionData?.twitter !== null ? organizacionData?.twitter : '',
      instagram:
        organizacionData?.instagram !== null ? organizacionData?.instagram : '',
      historial:
        organizacionData?.historial !== null ? organizacionData?.historial : '',
      email: organizacionData?.email !== null ? organizacionData?.email : '',
      ciudadId: direccion?.ciudadId !== undefined ? direccion?.ciudadId : 0,
      regionId: direccion?.regionId !== undefined ? direccion?.regionId : 0,
      calle: direccion?.calle,
      telefono: organizacionData?.telefono,
      paisId: direccion?.paisId !== undefined ? direccion?.paisId : 0,
      direccionId:
        direccion?.direccionId !== undefined ? direccion?.direccionId : 0
    })
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    const organizacionData = organizaciones.find(
      (organizacion) => organizacion.id === parseInt(id ?? '0')
    )
    if (organizacionData !== undefined) {
      const direccion = await organizacionService.getByDireccion(
        organizacionData.id
      )
      loadOrganizacionData(organizacionData, direccion)
    }
  }

  const formik = useFormik<UpdateOrganizacion>({
    initialValues: {
      id: 0,
      nombre: '',
      ciudadId: 0,
      calle: '',
      email: '',
      telefono: 0,
      regionId: 0,
      rubroId: 0,
      paisId: 0,
      facebook: '',
      twitter: '',
      instagram: '',
      website: '',
      direccionId: 0
    },
    validationSchema: yup.object().shape({
      email: yup.string().trim().email('El correo electrónico es invalido'),
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
      regionId: yup.number().required('La Region es obligatoria'),
      paisId: yup.number().required('El pais es obligatorio'),
      rubroId: yup.number().required('El rubro es obligatorio'),
      calle: yup
        .string()
        .trim()
        .max(255, 'La calle no debe superar los 255 caracteres'),
      twitter: yup
        .string()
        .trim()
        .max(255, 'El twitter no debe superar los 255 caracteres'),
      website: yup
        .string()
        .trim()
        .max(255, 'El sitio web no debe superar los 255 caracteres'),
      instagram: yup
        .string()
        .trim()
        .max(255, 'El instagram no debe superar los 255 caracteres'),
      historial: yup
        .string()
        .trim()
        .max(255, 'El historial no debe superar los 255 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await organizacionService.update(values)
        getSuccess('La organización se actualizó correctamente')
        navigate('/organizaciones')
      } catch (e) {
        console.log(e)
        getError('La organización no se actualizó correctamente')
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
            Formulario para Actualización de Organización
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
                name="telefono"
                label="Teléfono"
                fullWidth
                type="number"
                size="small"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                error={
                  formik.touched.telefono === true &&
                  Boolean(formik.errors.telefono)
                }
                helperText={
                  formik.touched.telefono === true && formik.errors.telefono
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.email === true && Boolean(formik.errors.email)
                }
                helperText={
                  formik.touched.email === true && formik.errors.email
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="rubro"
                options={rubros}
                value={
                  rubros.find((rubro) => rubro.id === formik.values.rubroId) ??
                  null
                }
                onChange={(event, value) => {
                  formik.setFieldValue('rubroId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Rubro"
                    required
                    value={formik.values.rubroId}
                  />
                )}
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
                value={
                  paises.find((pais) => pais.id === formik.values.paisId) ??
                  null
                }
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
                  ciudad.find((item) => item.id === formik.values.ciudadId) ??
                  null
                }
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
                    defaultValue={formik.values.ciudadId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="calle"
                label="Calle"
                fullWidth
                size="small"
                value={formik.values.calle}
                onChange={formik.handleChange}
                error={
                  formik.touched.calle === true && Boolean(formik.errors.calle)
                }
                helperText={
                  formik.touched.calle === true && formik.errors.calle
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="facebook"
                label="Facebook"
                fullWidth
                size="small"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                error={
                  formik.touched.facebook === true &&
                  Boolean(formik.errors.facebook)
                }
                helperText={
                  formik.touched.facebook === true && formik.errors.facebook
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="instagram"
                label="Instagram"
                fullWidth
                size="small"
                value={formik.values.instagram}
                onChange={formik.handleChange}
                error={
                  formik.touched.instagram === true &&
                  Boolean(formik.errors.instagram)
                }
                helperText={
                  formik.touched.instagram === true && formik.errors.instagram
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="twitter"
                label="Twitter"
                fullWidth
                size="small"
                value={formik.values.twitter}
                onChange={formik.handleChange}
                error={
                  formik.touched.twitter === true &&
                  Boolean(formik.errors.twitter)
                }
                helperText={
                  formik.touched.twitter === true && formik.errors.twitter
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="website"
                label="Sitio Web"
                fullWidth
                size="small"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={
                  formik.touched.website === true &&
                  Boolean(formik.errors.website)
                }
                helperText={
                  formik.touched.website === true && formik.errors.website
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

export default UpdateFormOrganizacion
