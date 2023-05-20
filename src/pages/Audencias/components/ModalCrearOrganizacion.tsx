import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  type DialogProps,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

import { useNotification } from '../../../context'
import { useDireccion, useRubro } from '../../../hooks'
import { type CreateOrganizacion, type SelectCiudad } from '../../../models'
import organizacionService from '../../../services/organizacion.service'
import { SkeletonFormOrganizacion } from '../../Organizaciones/components'

interface IModalCrearOrganizacionProps {
  open: boolean
  onClose: () => void
  addOrganizacionSelect: (id: number) => void
}
const ModalCrearOrganizacion: React.FC<IModalCrearOrganizacionProps> = (
  props: IModalCrearOrganizacionProps
) => {
  const { open, onClose, addOrganizacionSelect } = props

  const { rubros, loadRubros } = useRubro()
  const { paises, loadPaises, regiones, loadRegiones, ciudades, loadCiudades } =
    useDireccion()
  const [ciudad, setCiudad] = useState<SelectCiudad[]>([])
  const { getSuccess, getError } = useNotification()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xl')

  useEffect(() => {
    setIsLoading(true)
    if (rubros.length <= 0) loadRubros()

    if (paises.length <= 0) loadPaises()

    if (regiones.length <= 0) loadRegiones()

    if (ciudades.length <= 0) loadCiudades()
    setMaxWidth('xl')
    setIsLoading(false)
  }, [])

  const searchCiudades = (value: number): void => {
    const result = ciudades.filter((c) => c.regionId === value)
    setCiudad(result)
  }

  const formik = useFormik<CreateOrganizacion>({
    initialValues: {
      nombre: '',
      ciudadId: 0,
      calle: undefined,
      email: undefined,
      telefono: undefined,
      regionId: 0,
      rubroId: 0,
      paisId: 0,
      facebook: undefined,
      twitter: undefined,
      instagram: undefined,
      website: undefined
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
        const data = await organizacionService.create(values)
        getSuccess('La organización creada correctamente')
        setIsLoading(false)
        if (data !== null) {
          addOrganizacionSelect(data)
        }
        formik.resetForm()
        onClose()
      } catch (e) {
        console.log(e)
        getError('La organización no pudo ser creada')
        setIsLoading(false)
        onClose()
      }
    }
  })

  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth={maxWidth}>
      <DialogTitle>Crear Organización</DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        {isLoading ? (
          <SkeletonFormOrganizacion />
        ) : (
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content'
            }}
          >
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
                    formik.touched.email === true &&
                    Boolean(formik.errors.email)
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="calle"
                  label="Calle"
                  fullWidth
                  size="small"
                  value={formik.values.calle}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.calle === true &&
                    Boolean(formik.errors.calle)
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
                    formik.resetForm()
                    onClose()
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ModalCrearOrganizacion
