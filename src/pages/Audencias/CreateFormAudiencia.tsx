import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import {
  useAntiguedad,
  useCercania,
  useCuponDescuento,
  useDifusion,
  useEstadoAudiencia,
  useMotivacion,
  useOrganizacion,
  useOrigen,
  usePrefijo
} from '../../hooks'
import { type CreateAudiencia } from '../../models'
import audienciaService from '../../services/audiencia.service'

const CreateFormAudiencia: React.FC = () => {
  const { estadoAudiencias, loadEstadoAudiencias } = useEstadoAudiencia()
  const { organizaciones, loadOrganizaciones } = useOrganizacion()
  const { antiguedades, loadAntiguedades } = useAntiguedad()
  const { cercanias, loadCercanias } = useCercania()
  const { difusiones, loadDifusiones } = useDifusion()
  const { cuponDescuentos, loadCuponDescuentos } = useCuponDescuento()
  const { motivaciones, loadMotivaciones } = useMotivacion()
  const { prefijos, loadPrefijos } = usePrefijo()
  const { origenes, loadOrigenes } = useOrigen()
  const navigate = useNavigate()

  useEffect(() => {
    if (estadoAudiencias.length <= 0) loadEstadoAudiencias()

    if (organizaciones.length <= 0) loadOrganizaciones()

    if (antiguedades.length <= 0) loadAntiguedades()

    if (cercanias.length <= 0) loadCercanias()

    if (prefijos.length <= 0) loadPrefijos()

    if (origenes.length <= 0) loadOrigenes()

    loadDifusiones()

    loadCuponDescuentos()

    loadMotivaciones()
  }, [])

  const formik = useFormik<CreateAudiencia>({
    initialValues: {
      nombre: '',
      apellido: '',
      profesion: '',
      email: '',
      celular: '',
      organizacionId: 0,
      departamento: '',
      cargo: '',
      antiguedadId: 0,
      cercaniaId: 0,
      motivacionId: 0,
      estadoAudienciaId: 0,
      prefijoId: 0,
      origenId: 0,
      email2: null,
      documentoIdentidad: '',
      difusiones: [],
      cuponDescuentos: []
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .trim()
        .email('El correo electrónico es invalido')
        .required('El correo electrónico es obligatorio'),
      nombre: yup
        .string()
        .trim()
        .max(200, 'El nombre no debe superar los 200 caracteres')
        .required('El nombre es obligatorio'),
      celular: yup
        .string()
        .trim()
        .max(30, 'El teléfono no debe superar los 30 caracteres'),
      apellido: yup
        .string()
        .trim()
        .max(200, 'El apellido no debe superar los 200 caracteres'),
      profesion: yup
        .string()
        .trim()
        .max(200, 'El profesion no debe superar los 200 caracteres'),
      email2: yup
        .string()
        .nullable()
        .trim()
        .max(255, 'Elm email 2 no debe superar los 255 caracteres'),
      departamento: yup
        .string()
        .trim()
        .max(255, 'El departamento no debe superar los 255 caracteres'),
      origenId: yup.number().required('El origen es obligatorio'),
      antiguedadId: yup.number().required('El antiguedad es obligatorio'),
      motivacionId: yup.number().required('El motivacion es obligatorio'),
      estadoAudienciaId: yup.number().required('El estado es obligatorio'),
      cercaniaId: yup.number().required('El cercania es obligatorio'),
      cargo: yup
        .string()
        .trim()
        .max(255, 'El cargo no debe superar los 255 caracteres'),
      prefijoId: yup.number().required('El prefijo es obligatorio'),
      organizacionId: yup.number().required('El organizacion es obligatorio'),
      documentoIdentidad: yup
        .string()
        .trim()
        .max(30, 'El documentoIdentidad no debe superar los 30 caracteres')
    }),
    onSubmit: async (values) => {
      await audienciaService.create(values)
      navigate('/audiencias')
    }
  })

  return (
    <Card title="Formulario">
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Formulario para Creación de Audiencia
        </Typography>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Datos Personales</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
              disablePortal
              fullWidth
              size="small"
              id="origen"
              options={origenes}
              getOptionLabel={(option) => option.nombre}
              onChange={(event, value) => {
                formik.setFieldValue('origenId', value?.id ?? null)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Origen"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.origenId}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
              disablePortal
              fullWidth
              size="small"
              id="estadoAudiencia"
              options={estadoAudiencias}
              onChange={(event, value) => {
                formik.setFieldValue('estadoAudienciaId', value?.id ?? null)
              }}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Estado Audiencia"
                  required
                  value={formik.values.estadoAudienciaId}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Autocomplete
              disablePortal
              fullWidth
              size="small"
              id="Prefijo"
              options={prefijos}
              onChange={(event, value) => {
                formik.setFieldValue('prefijoId', value?.id ?? null)
              }}
              getOptionLabel={(option) => option.nombre}
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
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="nombre"
              label="Nombre"
              fullWidth
              required
              size="small"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={
                formik.touched.nombre === true && Boolean(formik.errors.nombre)
              }
              helperText={
                formik.touched.nombre === true && formik.errors.nombre
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="apellido"
              label="Apellido"
              fullWidth
              size="small"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              error={
                formik.touched.apellido === true &&
                Boolean(formik.errors.apellido)
              }
              helperText={
                formik.touched.apellido === true && formik.errors.apellido
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="documentoIdentidad"
              label="Documento Identidad"
              fullWidth
              size="small"
              value={formik.values.documentoIdentidad}
              onChange={formik.handleChange}
              error={
                formik.touched.documentoIdentidad === true &&
                Boolean(formik.errors.documentoIdentidad)
              }
              helperText={
                formik.touched.documentoIdentidad === true &&
                formik.errors.documentoIdentidad
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="celular"
              label="Teléfono"
              fullWidth
              size="small"
              value={formik.values.celular}
              onChange={formik.handleChange}
              error={
                formik.touched.celular === true &&
                Boolean(formik.errors.celular)
              }
              helperText={
                formik.touched.celular === true && formik.errors.celular
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              required
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={
                formik.touched.email === true && Boolean(formik.errors.email)
              }
              helperText={formik.touched.email === true && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="email2"
              label="Email 2"
              fullWidth
              size="small"
              value={formik.values.email2}
              onChange={formik.handleChange}
              error={
                formik.touched.email2 === true && Boolean(formik.errors.email2)
              }
              helperText={
                formik.touched.email2 === true && formik.errors.email2
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              name="profesion"
              label="Profesión"
              fullWidth
              size="small"
              value={formik.values.profesion}
              onChange={formik.handleChange}
              error={
                formik.touched.profesion === true &&
                Boolean(formik.errors.profesion)
              }
              helperText={
                formik.touched.profesion === true && formik.errors.profesion
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Datos Organización</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              disablePortal
              fullWidth
              size="small"
              id="organizacion"
              options={organizaciones}
              onChange={(event, value) => {
                formik.setFieldValue('organizacionId', value?.id ?? null)
              }}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Organización"
                  required
                  value={formik.values.organizacionId}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="cargo"
              label="Cargo"
              fullWidth
              size="small"
              value={formik.values.cargo}
              onChange={formik.handleChange}
              error={
                formik.touched.cargo === true && Boolean(formik.errors.cargo)
              }
              helperText={formik.touched.cargo === true && formik.errors.cargo}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="departamento"
              label="Departamento"
              fullWidth
              size="small"
              value={formik.values.departamento}
              onChange={formik.handleChange}
              error={
                formik.touched.departamento === true &&
                Boolean(formik.errors.departamento)
              }
              helperText={
                formik.touched.departamento === true &&
                formik.errors.departamento
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Calificación</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              disablePortal
              fullWidth
              size="small"
              id="antiguedad"
              options={antiguedades}
              getOptionLabel={(option) => option.nombre}
              onChange={(event, value) => {
                formik.setFieldValue('antiguedadId', value?.id ?? null)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Antiguedad"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.antiguedadId}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              disablePortal
              fullWidth
              size="small"
              id="cercania"
              options={cercanias}
              onChange={(event, value) => {
                formik.setFieldValue('cercaniaId', value?.id ?? null)
              }}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Cercania"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.cercaniaId}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              disablePortal
              fullWidth
              size="small"
              id="motivacion"
              options={motivaciones}
              getOptionLabel={(option) => option.nombre}
              onChange={(event, value) => {
                formik.setFieldValue('motivacionId', value?.id ?? null)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Motivación"
                  required
                  onChange={formik.handleChange}
                  value={formik.values.motivacionId}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Marketing</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
              multiple
              disablePortal
              fullWidth
              size="small"
              id="difusion"
              options={difusiones}
              onChange={(event, value) => {
                const newValues = value.map((option) => ({
                  difusionId: option.id
                }))
                formik.setFieldValue('difusiones', newValues)
              }}
              getOptionLabel={(option) => option.nombre}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Difusión" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Autocomplete
              multiple
              disablePortal
              fullWidth
              size="small"
              id="cuponDescuento"
              options={cuponDescuentos}
              onChange={(event, value) => {
                const newValues = value.map((option) => ({
                  cuponDescuentoId: option.id
                }))
                formik.setFieldValue('cuponDescuentos', newValues)
              }}
              getOptionLabel={(option) => option.codigo}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Cupon Descuento" />
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
                navigate('/audiencias')
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

export default CreateFormAudiencia
