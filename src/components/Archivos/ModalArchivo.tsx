import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  type DialogProps,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  Tab,
  Tabs,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

import { useNotification } from '../../context'
import { uploadFileToS3 } from '../../helpers/aws.helper'
import { type IArchivo, type ICRUDArchivo } from '../../models'
import { type ITipoArchivo } from '../../models/tipoArchivos'
import archivoService from '../../services/archivo.service'
import SkeletonFormArchivo from './SkeletonFormArchivo'

interface IModalArchivo {
  archivo: IArchivo
  tipoArchivos: ITipoArchivo[]
  open: boolean
  isLoading: boolean
  onClose: () => void
  handleIsLoading: () => void
  audienciaId: number
  addArchivo: (archivo: IArchivo) => void
}

const handleCreateFiles = async (
  values: any,
  audienciaId: number
): Promise<string> => {
  console.log('handleCreateFiles', values, audienciaId)
  const parentId = audienciaId.toString()
  if (!parentId) return ''
  if (!values.tipoArchivoId) throw new Error()

  console.log(values.publico)
  const file = values.archivo
  const name = values.nombre
  const parent = 'audiencia'
  const publicFile = values.publico
  console.log(file)
  return await uploadFileToS3({
    name,
    file,
    parentId,
    parent,
    publicFile
  })
}

const ModalArchivo: React.FC<IModalArchivo> = (props: IModalArchivo) => {
  const {
    archivo,
    isLoading,
    onClose,
    open,
    tipoArchivos,
    audienciaId,
    addArchivo,
    handleIsLoading
  } = props
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md')
  const [title, setTitle] = useState<string>('')
  const [currentTab, setCurrentTab] = useState(0)
  const { getSuccess, getError } = useNotification()

  const handleTabChange = (event: any, newValue: number): void => {
    setCurrentTab(newValue)
  }

  useEffect(() => {
    setMaxWidth('md')
    if (archivo.id !== 0) {
      setTitle('Actualizar Archivo')
    } else {
      setTitle('Crear Archivo')
    }
  }, [open])

  const formik = useFormik<ICRUDArchivo>({
    initialValues: {
      id: 0,
      nombre: '',
      path: '',
      tipoArchivoId: 0,
      publico: false,
      archivo: null
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(200, 'El nombre no debe superar los 200 caracteres')
        .required('El nombre es obligatorio'),
      path: yup
        .string()
        .max(200, 'El nombre no debe superar los 200 caracteres'),
      tipoArchivoId: yup
        .number()
        .typeError('El tipo de archivo es obligatorio')
        .required('El tipo de archivo es obligatorio')
    }),
    onSubmit: async (values) => {
      handleIsLoading()
      let data = null
      if (values.path.length > 0) {
        data = await archivoService.create(
          values.nombre,
          values.path,
          values.tipoArchivoId ?? 0,
          values.publico
        )
      } else {
        const path = await handleCreateFiles(values, audienciaId)
        data = await archivoService.create(
          values.nombre,
          path,
          values.tipoArchivoId ?? 0,
          values.publico
        )
      }

      if (data !== null) {
        getSuccess('Se creo correctamente el archivo')
        const result = await archivoService.getById(data)
        if (result !== null) addArchivo(result)
      } else {
        getError('No se pudo crear el archivo')
      }
      onClose()
      handleIsLoading()
    }
  })

  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        {isLoading ? (
          <SkeletonFormArchivo />
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
              <Grid item xs={12} sm={12} md={12}>
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  id="tipoArchivo"
                  options={tipoArchivos}
                  getOptionLabel={(option) => option.nombre}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(event, value) => {
                    formik.setFieldValue('tipoArchivoId', value?.id ?? null)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      label="Tipo de Archivo"
                      onChange={formik.handleChange}
                      value={formik.values.tipoArchivoId}
                      error={!!formik.errors.tipoArchivoId}
                      helperText={formik.errors.tipoArchivoId}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.publico}
                      value={formik.values.publico}
                      onChange={(event, value) => {
                        formik.setFieldValue('publico', value)
                      }}
                      name="switchValue"
                    />
                  }
                  label="Publico"
                />
              </Grid>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Archivo" />
                <Tab label="Path" />
              </Tabs>
              {currentTab === 1 && (
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    name="path"
                    label="Path"
                    fullWidth
                    size="small"
                    value={formik.values.path}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.path === true &&
                      Boolean(formik.errors.path)
                    }
                    helperText={
                      formik.touched.path === true && formik.errors.path
                    }
                  />
                </Grid>
              )}
              {currentTab === 0 && (
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    name="archivo"
                    label="Archivo"
                    type="file"
                    fullWidth
                    size="small"
                    inputProps={{
                      accept:
                        '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.tiff'
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file =
                        event.currentTarget.files &&
                        event.currentTarget.files[0]
                      if (file && file.size > 15 * 1024 * 1024) {
                        // El archivo excede los 16 megabytes
                        // Puedes mostrar una advertencia, restablecer el valor, etc.
                        console.log(
                          'El archivo excede los 16 megabytes permitidos'
                        )
                      } else {
                        // El archivo cumple con el tamaño máximo permitido
                        formik.setFieldValue('archivo', file)
                      }
                    }}
                    value={undefined}
                    error={
                      formik.touched.archivo && Boolean(formik.errors.archivo)
                    }
                    helperText={
                      formik.touched.archivo && formik.errors.archivo
                        ? String(formik.errors.archivo)
                        : ''
                    }
                  />
                </Grid>
              )}
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

export default ModalArchivo
