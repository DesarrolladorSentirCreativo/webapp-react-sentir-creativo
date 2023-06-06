import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { type FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Card } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import useCategoriPrivilegio from '../../hooks/useCategoriaPrivilegio'
import {
  type IAccesos,
  type IGetByIdPrivilegio,
  type IModuloCheckBox,
  type IUpdatePrivilegio
} from '../../models'
import moduloService from '../../services/modulo.service'
import privilegioService from '../../services/privilegio.service'
import { PermissionForm, SkeletonPrivilegio } from './components'

const UpdateFormPrivilegio: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getSuccess, getError } = useNotification()
  const [userId, setUserId] = useState<number>(0)
  const [permission, setPermission] = useState<IModuloCheckBox[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [expanded, setExpanded] = useState<string | false>(false)
  const { loadCategoriaPrivilegios, categoriaPrivilegios } =
    useCategoriPrivilegio()
  const [selectedAccesos, setSelectedAccesos] = useState<
    Record<number, IAccesos>
  >({})

  useEffect(() => {
    loadData(id)
    loadPages()
  }, [])

  const loadColeccionesCheckbox = async (): Promise<void> => {
    const data = await moduloService.getColecciones()
    setPermission(data)
  }

  const handleAccordionChange =
    (panel: string) =>
    (event: React.SyntheticEvent, isExpanded: boolean): void => {
      setExpanded(isExpanded ? panel : false)
    }

  const loadPages = async (): Promise<void> => {
    setLoading(true)
    getUserId()
    await loadColeccionesCheckbox()
    await loadCategoriaPrivilegios()
    setLoading(false)
  }
  const getUserId = (): void => {
    const userData = getLocalStorage('user') || '{}'
    const user = JSON.parse(userData)
    setUserId(user.userId)
  }

  const loadPrivilegioData = async (
    privilegio: IGetByIdPrivilegio
  ): Promise<void> => {
    formik.setValues({
      id: privilegio.id,
      nombre: privilegio.nombre,
      categoriaId: privilegio.categoriaId,
      descripcion: privilegio.descripcion
    })

    const initialValues: Record<string, IAccesos> = {}
    privilegio.accesos.forEach((acceso) => {
      initialValues[acceso.coleccionId] = {
        crear: acceso.crear,
        ver: acceso.ver,
        actualizar: acceso.actualizar,
        eliminar: acceso.eliminar
      }
    })
    setSelectedAccesos(initialValues)
  }

  const loadData = async (id: string | undefined): Promise<void> => {
    const privilegio = await privilegioService.getById(id ?? '')
    loadPrivilegioData(privilegio)
  }

  const formik = useFormik<IUpdatePrivilegio>({
    initialValues: {
      id: '',
      nombre: '',
      categoriaId: 0,
      descripcion: ''
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(200, 'El nombre no debe superar los 255 caracteres')
        .required('El nombre es obligatorio'),
      categoriaId: yup
        .number()
        .typeError('La categoría es obligatoria')
        .required('La categoría es obligatoria'),
      descripcion: yup
        .string()
        .trim()
        .max(1024, 'La descripcion no debe superar los 1024 caracteres')
    }),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await privilegioService.update(values, userId, selectedAccesos)
        getSuccess('El privilegio fue actualizado correctamente')
        navigate('/privilegios')
      } catch (e) {
        console.log(e)
        getError('El privilegio no pudo ser actualizado')
        setLoading(false)
      }
    }
  })

  if (loading) {
    return <SkeletonPrivilegio />
  } else {
    return (
      <>
        <Card title="Formulario">
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              Formulario para Actualización de Privilegio
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
                <Autocomplete
                  disablePortal
                  fullWidth
                  size="small"
                  id="categoriaId"
                  options={categoriaPrivilegios}
                  onChange={(event, value) => {
                    formik.setFieldValue('categoriaId', value?.id ?? null)
                  }}
                  value={
                    categoriaPrivilegios.find(
                      (categoriaPrivilegio) =>
                        categoriaPrivilegio.id === formik.values.categoriaId
                    ) ?? null
                  }
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Categoria"
                      required
                      value={formik.values.categoriaId}
                      error={!!formik.errors.categoriaId}
                      helperText={formik.errors.categoriaId}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Accordion
                  expanded={expanded === 'panel1'}
                  onChange={handleAccordionChange('panel1')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Permisos *
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Accesos a los módulos
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PermissionForm
                      data={permission}
                      selectedAccesos={selectedAccesos}
                      setSelectedAccesos={setSelectedAccesos}
                    />
                  </AccordionDetails>
                </Accordion>
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
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    navigate('/privilegios')
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    )
  }
}

export default UpdateFormPrivilegio
