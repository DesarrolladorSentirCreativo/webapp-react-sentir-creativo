import {
  Box,
  Button,
  Dialog,
  DialogContent,
  type DialogProps,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

import { type IArchivo, type ICRUDArchivo } from '../../models'
import { type ITipoArchivo } from '../../models/tipoArchivos'
import SkeletonFormArchivo from './SkeletonFormArchivo'

interface IModalArchivo {
  archivo: IArchivo
  tipoArchivos: ITipoArchivo[]
  open: boolean
  isLoading: boolean
  onClose: () => void
  handleIsLoading: () => void
}

const ModalArchivo: React.FC<IModalArchivo> = (props: IModalArchivo) => {
  const { archivo, isLoading, onClose, open } = props
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('xl')
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    setMaxWidth('xl')
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
        .trim()
        .max(200, 'El nombre no debe superar los 200 caracteres'),
      tipoArchivoId: yup
        .number()
        .typeError('El tipo de archivo es obligatorio')
        .required('El tipo de archivo es obligatorio')
    }),
    onSubmit: async (values) => {
      console.log('pasa')
      console.log(values)
      // await audienciaService.create(values, comentarios)
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
                <TextField
                  name="path"
                  label="Path"
                  fullWidth
                  required
                  size="small"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.path === true && Boolean(formik.errors.path)
                  }
                  helperText={
                    formik.touched.path === true && formik.errors.path
                  }
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
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  name="archivo"
                  label="Archivo"
                  type="file"
                  fullWidth
                  required
                  size="small"
                  inputProps={{
                    accept:
                      '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.tiff'
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file =
                      event.currentTarget.files && event.currentTarget.files[0]
                    if (file && file.size > 16 * 1024 * 1024) {
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
