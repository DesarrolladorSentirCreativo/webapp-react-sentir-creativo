import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useFormik } from 'formik'
import { type FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { useDireccion, usePrefijo } from '../../hooks'
import { type ICreateUsuarioAdmin, type SelectCiudad } from '../../models'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'

const CreateFormUsuarioAdmin: FC = () => {
  const { paises, loadPaises, regiones, loadRegiones, ciudades, loadCiudades } =
    useDireccion()
  const navigate = useNavigate()
  const [ciudad, setCiudad] = useState<SelectCiudad[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const { prefijos, loadPrefijos } = usePrefijo()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async (): Promise<void> => {
    setIsLoading(true)

    if (paises.length <= 0) await loadPaises()

    if (regiones.length <= 0) await loadRegiones()

    if (ciudades.length <= 0) await loadCiudades()

    await loadPrefijos()
    setIsLoading(false)
  }
  const formik = useFormik<ICreateUsuarioAdmin>({
    initialValues: {
      prefijoId: 0,
      nombre: '',
      apellidos: '',
      validaDocumento: true,
      tipoDocumento: 'RUN',
      numDocumento: '',
      email: '',
      password: '',
      emailPersonal: '',
      telefono: '',
      categoriaId: 0,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      fechaPago: new Date(),
      sueldoBruto: 0,
      afpId: 0,
      modoId: 0,
      estadoId: 0,
      previsionId: 0,
      ciudadId: 0,
      regionId: 0,
      paisId: 0,
      direccion: '',
      archivos: [],
      comentarios: [],
      roles: [],
      privilegios: [],
      sucursales: [],
      acuerdos: []
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(200, 'El nombre no debe superar los 255 caracteres')
        .required('El nombre es obligatorio'),
      email: yup
        .string()
        .trim()
        .max(256, 'El email no debe superar los 256 caracteres')
        .required('el email es obligatorio'),
      ciudadId: yup.number().required('La ciudad es obligatoria'),
      paisId: yup.number().required('El pais es obligatorio'),
      regionId: yup.number().required('La region es obligatorio'),
      direccion: yup
        .string()
        .trim()
        .max(255, 'La direccion no debe superar los 1024 caracteres'),
      emailPersonal: yup
        .string()
        .trim()
        .max(256, 'El email personal no debe superar los 256 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        //  await sucursalService.create(values)
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
            Formulario para Creación de Usuario
          </Typography>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Datos Personales</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="prefijoId"
                options={prefijos}
                onChange={(event, value) => {
                  formik.setFieldValue('prefijoId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Prefijo"
                    required
                    value={formik.values.prefijoId}
                  />
                )}
              />
            </Grid>
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
                name="apellidos"
                label="Apellidos"
                fullWidth
                required
                size="small"
                value={formik.values.apellidos}
                onChange={formik.handleChange}
                error={
                  formik.touched.nombre === true &&
                  Boolean(formik.errors.apellidos)
                }
                helperText={
                  formik.touched.apellidos === true && formik.errors.apellidos
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
                    label="Tipo de Documento"
                    required
                    value={formik.values.paisId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.validaDocumento}
                    onChange={(event, value) => {
                      formik.setFieldValue('validaDocumento', value ?? null)
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Validar RUN"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="numDocumento"
                label="Numero de Documento"
                fullWidth
                required
                size="small"
                value={formik.values.numDocumento}
                onChange={formik.handleChange}
                error={
                  formik.touched.nombre === true &&
                  Boolean(formik.errors.numDocumento)
                }
                helperText={
                  formik.touched.numDocumento === true &&
                  formik.errors.numDocumento
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="emailPersonal"
                label="Email Personal"
                fullWidth
                size="small"
                value={formik.values.emailPersonal}
                onChange={formik.handleChange}
                error={
                  formik.touched.emailPersonal === true &&
                  Boolean(formik.errors.emailPersonal)
                }
                helperText={
                  formik.touched.emailPersonal === true &&
                  formik.errors.emailPersonal
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="telefono"
                label="Telefono"
                fullWidth
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
                  navigate('/usuarios')
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

export default CreateFormUsuarioAdmin
