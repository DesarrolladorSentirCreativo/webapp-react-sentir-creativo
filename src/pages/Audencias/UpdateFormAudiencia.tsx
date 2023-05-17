import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Comentario } from '../../components'
import { Card, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import { getLocalStorage } from '../../helpers/localstorage.helper'
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
import useDialogButton from '../../hooks/useDialogButton'
import { type IComentario, type UpdateAudiencia } from '../../models'
import audienciaService from '../../services/audiencia.service'
import comentarioService from '../../services/comentario.service'
import { ModalCrearOrganizacion, SkeletonAudiencia } from './components'

const UpdateFormAudiencia: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { estadoAudiencias, loadEstadoAudiencias } = useEstadoAudiencia()
  const { organizaciones, loadOrganizaciones } = useOrganizacion()
  const { antiguedades, loadAntiguedades } = useAntiguedad()
  const { cercanias, loadCercanias } = useCercania()
  const { difusiones, loadDifusiones } = useDifusion()
  const { cuponDescuentos, loadCuponDescuentos } = useCuponDescuento()
  const { motivaciones, loadMotivaciones } = useMotivacion()
  const { prefijos, loadPrefijos } = usePrefijo()
  const { origenes, loadOrigenes } = useOrigen()
  const [userId, setUserId] = useState<number>(0)
  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(false)
  const [comentarios, setComentarios] = useState<IComentario[]>([])
  const [editing, setEditing] = useState<boolean>(false)
  const [comentarioId, setComentarioId] = useState<number>(0)
  const { open, handleOpen, handleClose } = useDialogButton()
  const { getSuccess, getError } = useNotification()
  const [messageError, setMessageError] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [comentario, setComentario] = useState<string>('')

  useEffect(() => {
    load(id)
  }, [])

  const load = async (id: string | undefined): Promise<void> => {
    setLoadingSkeleton(true)
    if (estadoAudiencias.length <= 0) loadEstadoAudiencias()

    if (organizaciones.length <= 0) loadOrganizaciones()

    if (antiguedades.length <= 0) loadAntiguedades()

    if (cercanias.length <= 0) loadCercanias()

    if (prefijos.length <= 0) loadPrefijos()

    if (origenes.length <= 0) loadOrigenes()

    loadDifusiones()

    loadCuponDescuentos()

    loadMotivaciones()

    getUserId()
    if (id !== undefined) {
      const data = await audienciaService.getById(parseInt(id))
      const comentariosData = await Promise.all(
        data.comentarios.map(async (comentario) => {
          console.log(comentario.id)
          const comentarioData = await comentarioService.getById(comentario.id)
          return comentarioData
        })
      )
      const comentariosValidos = comentariosData.filter(
        (comentario) => comentario !== null && comentario !== undefined
      ) as IComentario[]
      setComentarios(comentariosValidos)
      loadAudienciaData(data)
    }

    formik.validateForm()
    setLoadingSkeleton(false)
  }

  const getUserId = (): void => {
    const userData = getLocalStorage('user') || '{}'
    const user = JSON.parse(userData)
    setUserId(user.userId)
  }

  const handleSubmit = (): void => {}

  const formik = useFormik<UpdateAudiencia>({
    initialValues: {
      id: 0,
      nombre: '',
      apellido: '',
      profesion: '',
      email: '',
      celular: undefined,
      organizaciones: [],
      departamento: '',
      cargo: '',
      antiguedadId: 0,
      cercaniaId: 0,
      motivacionId: 0,
      estadoAudienciaId: 0,
      prefijoId: 0,
      origenId: 0,
      email2: '',
      documentoIdentidad: '',
      difusiones: [],
      cuponDescuentos: [],
      comentarios: []
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
      origenId: yup
        .number()
        .typeError('El otigen es obligatorio')
        .required('El origen es obligatorio'),
      antiguedadId: yup
        .number()
        .typeError('La antiguedad es obligatorio')
        .required('El antiguedad es obligatorio'),
      motivacionId: yup
        .number()
        .typeError('La motivacion es obligatorio')
        .required('El motivacion es obligatorio'),
      estadoAudienciaId: yup
        .number()
        .typeError('El estado es obligatorio')
        .required('El estado es obligatorio'),
      cercaniaId: yup
        .number()
        .typeError('La cercania es obligatorio')
        .required('La cercania es obligatorio'),
      cargo: yup
        .string()
        .trim()
        .max(255, 'El cargo no debe superar los 255 caracteres'),
      prefijoId: yup
        .number()
        .typeError('El prefijo es obligatorio')
        .required('El prefijo es obligatorio'),
      documentoIdentidad: yup
        .string()
        .trim()
        .required('El documento de identidad es obligatorio')
        .max(30, 'El documentoIdentidad no debe superar los 30 caracteres')
    }),
    onSubmit: async (values) => {
      console.log('pasa')
      // await audienciaService.create(values, comentarios)
      navigate('/audiencias')
    }
  })

  const loadAudienciaData = async (
    audiencia: UpdateAudiencia
  ): Promise<void> => {
    formik.setValues({
      id: audiencia.id,
      nombre: audiencia.nombre,
      apellido: audiencia.apellido,
      profesion: audiencia.profesion,
      email: audiencia.email,
      celular: audiencia.celular,
      organizaciones: audiencia.organizaciones,
      departamento: audiencia.departamento,
      cargo: audiencia.cargo,
      cercaniaId: audiencia.cercaniaId,
      prefijoId: audiencia.prefijoId,
      motivacionId: audiencia.motivacionId,
      estadoAudienciaId: audiencia.estadoAudienciaId,
      origenId: audiencia.origenId,
      email2: audiencia.email2,
      documentoIdentidad: audiencia.documentoIdentidad,
      difusiones: audiencia.difusiones,
      cuponDescuentos: audiencia.cuponDescuentos,
      antiguedadId: audiencia.antiguedadId,
      comentarios: audiencia.comentarios
    })
  }

  const handleConfirm = async (): Promise<void> => {
    comentarioService
      .deleteById(comentarioId)
      .then((data) => {
        setComentarios(
          comentarios.filter((comentario) => comentario.id !== comentarioId)
        )
        setComentarioId(0)
        setComentario('')
        handleClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSetComentario = (value: string): void => {
    setComentario(value)
  }

  const handleSetComentarioId = (value: number): void => {
    setComentarioId(value)
  }

  const handleSetEditing = (value: boolean): void => {
    setEditing(value)
  }

  const handleCreateComentario = (comentario: string, userId: number): void => {
    setLoading(true)

    comentarioService
      .create(comentario, userId)
      .then((data) => {
        setComentarios([...comentarios, data])
        setComentario('')
        getSuccess('Comentario creado exitosamente')
      })
      .catch((error) => {
        getError('Comentario no pudo ser creado')
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateComentario = (
    comentario: string,
    userId: number,
    comentarioId: number
  ): void => {
    setLoading(true)

    comentarioService
      .update(comentario, userId, comentarioId)
      .then((data) => {
        const updatedComentarios = comentarios.map(
          (comentario: IComentario) => {
            return comentario.id === data.id ? data : comentario
          }
        )

        console.log(updatedComentarios)
        setComentarios(updatedComentarios)
        setComentario('')
        setComentarioId(0)
        getSuccess('Se actualizó el comentario correctamente')
      })
      .catch((error) => {
        getError('No se pudo modificar el comentario')
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleComentarioSave = (): void => {
    if (comentario.length > 0) {
      if (!editing) {
        handleCreateComentario(comentario, userId)
      } else {
        handleUpdateComentario(comentario, userId, comentarioId)
      }
    }
  }

  const handlePrepareToEdit = (value = '', id: number): void => {
    setComentario(value)
    setComentarioId(id)
    setEditing(true)
  }

  const handleOpenModal = (): void => {
    setOpenModal(true)
  }

  const handleCloseModal = (): void => {
    loadOrganizaciones()
    setOpenModal(false)
  }
  if (loadingSkeleton) {
    return <SkeletonAudiencia />
  } else {
    return (
      <>
        <Card title="Formulario">
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Formulario para Actualización de Audiencia
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
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => {
                  formik.setFieldValue('origenId', value?.id ?? null)
                }}
                value={
                  origenes.find(
                    (origen) => origen.id === formik.values.origenId
                  ) ?? null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Origen"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.origenId}
                    error={!!formik.errors.origenId}
                    helperText={formik.errors.origenId}
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
                value={
                  estadoAudiencias.find(
                    (estadoAudiencia) =>
                      estadoAudiencia.id === formik.values.estadoAudienciaId
                  ) ?? null
                }
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Estado Audiencia"
                    required
                    value={formik.values.estadoAudienciaId}
                    error={!!formik.errors.estadoAudienciaId}
                    helperText={formik.errors.estadoAudienciaId}
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
                value={
                  prefijos.find(
                    (prefijo) => prefijo.id === formik.values.prefijoId
                  ) ?? null
                }
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Prefijo"
                    required
                    value={formik.values.prefijoId}
                    error={!!formik.errors.prefijoId}
                    helperText={formik.errors.prefijoId}
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
                  formik.touched.nombre === true &&
                  Boolean(formik.errors.nombre)
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
                helperText={
                  formik.touched.email === true && formik.errors.email
                }
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
                  formik.touched.email2 === true &&
                  Boolean(formik.errors.email2)
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
            <Grid item xs={12} sm={6} md={2}>
              <Autocomplete
                multiple
                disablePortal
                fullWidth
                size="small"
                id="organizacionId"
                options={organizaciones}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    organizacionId: option.id
                  }))
                  formik.setFieldValue('organizaciones', newValues)
                }}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Organizaciones" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
              >
                Crear Organización
              </Button>
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
                helperText={
                  formik.touched.cargo === true && formik.errors.cargo
                }
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
                  formik.setFieldValue('antiguedadId', value?.id ?? 0)
                }}
                value={
                  antiguedades.find(
                    (antiguedad) => antiguedad.id === formik.values.antiguedadId
                  ) ?? null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Antiguedad"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.antiguedadId}
                    error={!!formik.errors.antiguedadId}
                    helperText={formik.errors.antiguedadId}
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
                value={
                  cercanias.find(
                    (cercania) => cercania.id === formik.values.cercaniaId
                  ) ?? null
                }
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Cercania"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.cercaniaId}
                    error={!!formik.errors.cercaniaId}
                    helperText={formik.errors.cercaniaId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="motivacionId"
                options={motivaciones}
                getOptionLabel={(option) => option.nombre}
                onChange={(event, value) => {
                  formik.setFieldValue('motivacionId', value?.id ?? null)
                }}
                value={
                  motivaciones.find(
                    (motivacion) => motivacion.id === formik.values.motivacionId
                  ) ?? null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Motivación"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.motivacionId}
                    error={!!formik.errors.motivacionId}
                    helperText={formik.errors.motivacionId}
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
                value={difusiones.filter((difusion) =>
                  formik.values.difusiones.some(
                    (selected) => selected.difusionId === difusion.id
                  )
                )}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    difusionId: option.id
                  }))
                  formik.setFieldValue('difusiones', newValues)
                }}
                getOptionLabel={(option) => option?.nombre}
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
                value={cuponDescuentos.filter((cuponDescuento) =>
                  formik.values.cuponDescuentos.some(
                    (selected) =>
                      selected.cuponDescuentoId === cuponDescuento.id
                  )
                )}
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
          <Comentario
            handleComentarioSave={handleComentarioSave}
            handleSetComentario={handleSetComentario}
            comentario={comentario}
            loading={loading}
            editing={editing}
            handleSetEditing={handleSetEditing}
            handlePrepareToEdit={handlePrepareToEdit}
            comentarios={comentarios}
            handleOpen={handleOpen}
            handleSetComentarioId={handleSetComentarioId}
          />
          <Grid item md={12}>
            <Typography variant="body1" sx={{ color: 'red' }}>
              {messageError}
            </Typography>
          </Grid>
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Button
                fullWidth
                variant="contained"
                type="button"
                onClick={(e) => {
                  handleSubmit()
                }}
              >
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
          <DialogButton
            open={open}
            onClose={handleClose}
            title="Confirmación"
            message="¿Estás seguro de que deseas eliminar este comentario?"
            onConfirm={handleConfirm}
            confirmButtonText="Confirmar"
            cancelButtonText="Cancelar"
          />
        </Card>
        <ModalCrearOrganizacion open={openModal} onClose={handleCloseModal} />
      </>
    )
  }
}

export default UpdateFormAudiencia
