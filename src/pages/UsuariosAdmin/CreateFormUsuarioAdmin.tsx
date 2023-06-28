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
import { type FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { Card, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import { formatDateInput } from '../../helpers/date.helper'
import { getLocalStorage } from '../../helpers/localstorage.helper'
import { calcularDigitoVerificador } from '../../helpers/rut.helper'
import { useDireccion, usePrefijo } from '../../hooks'
import useAcuerdoUserAdmin from '../../hooks/useAcuerdoUserAdmin'
import useCategoriUserAdmin from '../../hooks/useCategoriaUserAdmin'
import useDialogButton from '../../hooks/useDialogButton'
import useEstadoUserAdmin from '../../hooks/useEstadoUserAdmin'
import useModoTrabajo from '../../hooks/useModoTrabajo'
import usePrevision from '../../hooks/usePrevision'
import usePrivilegio from '../../hooks/usePrivilegio'
import useRol from '../../hooks/useRol'
import useSucursal from '../../hooks/useSucursal'
import {
  type IComentario,
  type ICreateUsuarioAdmin,
  type IUserAdminPermisos,
  type SelectCiudad
} from '../../models'
import comentarioService from '../../services/comentario.service'
import userAdminService from '../../services/userAdmin.service'
import { SkeletonFormOrganizacion } from '../Organizaciones/components'
import Comentario from './../../components/Comentarios/Comentario'
import useAfp from './../../hooks/useAfp'

const tiposCuentas = [
  { id: 'Cuenta Corriente', nombre: 'Cuenta Corriente' },
  { id: 'Cuenta Vista', nombre: 'Cuenta Vista' },
  { id: 'Cuenta de Ahorro', nombre: 'Cuenta de Ahorro' },
  { id: 'Cuenta Rut', nombre: 'Cuenta Rut' }
]

const tiposDocumentos = [
  { id: 'RUN', nombre: 'RUN' },
  { id: 'Pasaporte', nombre: 'Pasaporte' }
]

const CreateFormUsuarioAdmin: FC = () => {
  const { paises, loadPaises, regiones, loadRegiones, ciudades, loadCiudades } =
    useDireccion()
  const navigate = useNavigate()
  const [ciudad, setCiudad] = useState<SelectCiudad[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { getSuccess, getError } = useNotification()
  const { prefijos, loadPrefijos } = usePrefijo()
  const { afps, loadAfps } = useAfp()
  const { previsiones, loadPrevisiones } = usePrevision()
  const { roles, loadRoles } = useRol()
  const { privilegios, loadPrivilegios } = usePrivilegio()
  const { sucursales, loadSucursales } = useSucursal()
  const { acuerdosUserAdmins, loadAcuerdoUserAdmins } = useAcuerdoUserAdmin()
  const [comentario, setComentario] = useState<string>('')
  const [comentarios, setComentarios] = useState<IComentario[]>([])
  const [editing, setEditing] = useState<boolean>(false)
  const [comentarioId, setComentarioId] = useState<number>(0)
  const { open, handleOpen, handleClose } = useDialogButton()
  const [loading, setLoading] = useState<boolean>(false)
  const [userId, setUserId] = useState<number>(0)
  const { categoriaUserAdmins, loadCategoriaUserAdmins } =
    useCategoriUserAdmin()
  const { loadEstadoUserAdmins, estadoUserAdmins } = useEstadoUserAdmin()
  const { modosTrabajos, loadModosTrabajos } = useModoTrabajo()
  const [digitoVerificadorError, setDigitoVerificadorError] =
    useState<string>('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 28
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
        if (paises.length <= 0) await loadPaises()

        if (regiones.length <= 0) await loadRegiones()

        if (ciudades.length <= 0) await loadCiudades()

        getUserId()
        await loadPrefijos()
        await loadAfps()
        await loadPrevisiones()
        await loadRoles()
        await loadPrivilegios()
        await loadSucursales()
        await loadAcuerdoUserAdmins()
        await loadCategoriaUserAdmins()
        await loadModosTrabajos()
        await loadEstadoUserAdmins()
      } else {
        navigate('/home')
      }
    } catch (error) {
      console.log('Mi error', error)
    } finally {
      setIsLoading(false)
    }
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
      acuerdos: [],
      alias: '',
      repeatPassword: '',
      banco: '',
      tipoCuenta: '',
      numCuenta: ''
    },
    validationSchema: yup.object().shape({
      nombre: yup
        .string()
        .trim()
        .max(200, 'El nombre no debe superar los 80 caracteres')
        .required('El nombre es obligatorio'),
      apellidos: yup
        .string()
        .trim()
        .max(200, 'El nombre no debe superar los 80 caracteres')
        .required('Los apellidos son obligatorio'),
      email: yup
        .string()
        .trim()
        .max(256, 'El email no debe superar los 256 caracteres')
        .required('el email es obligatorio'),
      numDocumento: yup
        .string()
        .trim()
        .max(30, 'El numero de documento no debe superar los 30 caracteres')
        .required('el numero de documento es obligatorio'),
      alias: yup
        .string()
        .trim()
        .max(50, 'El alias no debe superar los 50 caracteres')
        .required('el alias es obligatorio'),
      ciudadId: yup.number().required('La ciudad es obligatoria'),
      paisId: yup.number().required('El pais es obligatorio'),
      regionId: yup.number().required('La region es obligatorio'),
      afpId: yup.number().required('El afp es obligatoria'),
      previsionId: yup.number().required('La prevision es obligatoria'),
      categoriaId: yup.number().required('La categoria es obligatoria'),
      modoId: yup.number().required('El modo es obligatorio'),
      tipoDocumento: yup
        .string()
        .required('El tipo de documento es obligatorio'),
      roles: yup
        .array()
        .test('arrayVacio', 'Los roles son obligatorios', function (value) {
          return value && value.length > 0
        }),
      direccion: yup
        .string()
        .trim()
        .required('La direccion es obligatoria')
        .max(255, 'La direccion no debe superar los 1024 caracteres'),
      emailPersonal: yup
        .string()
        .trim()
        .max(256, 'El email personal no debe superar los 256 caracteres'),
      sueldoBruto: yup.number().required('El sueldo bruto es obligatorio'),
      telefono: yup
        .string()
        .trim()
        .max(30, 'El telefono no debe superar los 30 caracteres')
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await userAdminService.create(values, comentarios, userId)
        getSuccess('El usuario fue creado correctamente')
        navigate('/usuarios')
      } catch (e) {
        console.log(e)
        getError('El usuario no pudo ser creado')
        setIsLoading(false)
      }
    }
  })

  const searchCiudades = (value: number): void => {
    const result = ciudades.filter((c) => c.regionId === value)
    setCiudad(result)
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

  const rutInputRef = useRef<HTMLInputElement>(null)
  const rutActualRef = useRef<string>(formik.values.numDocumento)

  useEffect(() => {
    rutActualRef.current = formik.values.numDocumento
  }, [formik.values.numDocumento])

  const handleRutChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const rut: string = event.target.value
    const rutLimpio: string = rut.replace(/[^0-9kK]/g, '')
    const digitoVerificadorIngresado: string = rutLimpio.charAt(
      rutLimpio.length - 1
    )

    if (!/^[0-9kK]$/.test(digitoVerificadorIngresado)) {
      setDigitoVerificadorError('Dígito verificador inválido')
    } else {
      setDigitoVerificadorError('')

      const digitoVerificadorCalculado: string = calcularDigitoVerificador(
        rutLimpio.slice(0, -1)
      )
      setDigitoVerificadorError(
        digitoVerificadorIngresado.toLowerCase() !==
          digitoVerificadorCalculado.toLowerCase()
          ? 'Dígito verificador incorrecto'
          : ''
      )
    }

    formik.handleChange(event)
  }

  useEffect(() => {
    if (
      rutInputRef.current &&
      rutActualRef.current !== formik.values.numDocumento
    ) {
      rutInputRef.current.value = formik.values.numDocumento
    }
  }, [formik.values.numDocumento])

  const handleSetComentario = (value: string): void => {
    setComentario(value)
  }

  const handleSetComentarioId = (value: number): void => {
    setComentarioId(value)
  }

  const handlePrepareToEdit = (value = '', id: number): void => {
    setComentario(value)
    setComentarioId(id)
    setEditing(true)
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

  const getUserId = (): void => {
    const userData = getLocalStorage('user') || '{}'
    const user = JSON.parse(userData)
    setUserId(user.userId)
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
                id="tipoDocumento"
                options={tiposDocumentos}
                onChange={(event, value) => {
                  formik.setFieldValue('tipoDocumento', value?.id ?? null)
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
                    value={formik.values.tipoDocumento}
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
              {formik.values.validaDocumento ? (
                <TextField
                  name="numDocumento"
                  label="Numero de Documento"
                  fullWidth
                  required
                  size="small"
                  value={formik.values.numDocumento}
                  onChange={handleRutChange}
                  inputRef={rutInputRef}
                  error={
                    (formik.touched.numDocumento ??
                      digitoVerificadorError !== '') &&
                    Boolean(formik.errors.numDocumento)
                  }
                  helperText={
                    <>
                      {formik.touched.numDocumento === true &&
                        formik.errors.numDocumento}
                      {digitoVerificadorError && digitoVerificadorError}
                    </>
                  }
                />
              ) : (
                <TextField
                  name="numDocumento"
                  label="Numero de Documento"
                  fullWidth
                  required
                  size="small"
                  value={formik.values.numDocumento}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.numDocumento === true &&
                    Boolean(formik.errors.numDocumento)
                  }
                  helperText={
                    formik.touched.numDocumento === true &&
                    formik.errors.numDocumento
                  }
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="emailPersonal"
                label="Email Personal"
                fullWidth
                type="email"
                required
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
            <Grid item xs={12}>
              <Typography variant="h6">Datos Laborales</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="fechaIngreso"
                label="Fecha de Inicio"
                fullWidth
                type="date"
                required
                size="small"
                value={
                  formik.values.fechaInicio
                    ? formatDateInput(formik.values.fechaInicio)
                    : ''
                }
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value)
                  formik.setFieldValue('fechaInicio', selectedDate)
                }}
                error={
                  formik.touched.fechaInicio &&
                  Boolean(formik.errors.fechaInicio)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="fechaFin"
                label="Fecha de Fin"
                fullWidth
                type="date"
                size="small"
                value={
                  formik.values.fechaFin
                    ? formatDateInput(formik.values.fechaFin)
                    : ''
                }
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value)
                  formik.setFieldValue('fechaFin', selectedDate)
                }}
                error={
                  formik.touched.fechaFin && Boolean(formik.errors.fechaFin)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="fechaPago"
                label="Fecha de Pago"
                fullWidth
                type="date"
                size="small"
                value={
                  formik.values.fechaPago
                    ? formatDateInput(formik.values.fechaPago)
                    : ''
                }
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value)
                  formik.setFieldValue('fechaPago', selectedDate)
                }}
                error={
                  formik.touched.fechaPago && Boolean(formik.errors.fechaPago)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="sueldoBruto"
                label="Sueldo Bruto"
                fullWidth
                type="number"
                required
                size="small"
                value={formik.values.sueldoBruto}
                onChange={formik.handleChange}
                error={
                  formik.touched.sueldoBruto === true &&
                  Boolean(formik.errors.sueldoBruto)
                }
                helperText={
                  formik.touched.sueldoBruto === true &&
                  formik.errors.sueldoBruto
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="modo"
                options={modosTrabajos}
                onChange={(event, value) => {
                  formik.setFieldValue('modoId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Modo de Trabajo"
                    required
                    value={formik.values.modoId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="afp"
                options={afps}
                onChange={(event, value) => {
                  formik.setFieldValue('afpId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="AFP"
                    required
                    value={formik.values.afpId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="prevision"
                options={previsiones}
                onChange={(event, value) => {
                  formik.setFieldValue('previsionId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Previsión"
                    required
                    value={formik.values.previsionId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="estado"
                options={estadoUserAdmins}
                onChange={(event, value) => {
                  formik.setFieldValue('estadoId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Estado"
                    required
                    value={formik.values.estadoId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Datos Bancarios</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="banco"
                label="Banco"
                fullWidth
                required
                size="small"
                value={formik.values.banco}
                onChange={formik.handleChange}
                error={
                  formik.touched.banco === true && Boolean(formik.errors.banco)
                }
                helperText={
                  formik.touched.banco === true && formik.errors.banco
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="tipoCuenta"
                options={tiposCuentas}
                onChange={(event, value) => {
                  formik.setFieldValue('tipoCuenta', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Tipo de Cuenta"
                    required
                    value={formik.values.tipoCuenta}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="numCuenta"
                label="Numero de Cuenta"
                fullWidth
                required
                size="small"
                value={formik.values.numCuenta}
                onChange={formik.handleChange}
                error={
                  formik.touched.numCuenta === true &&
                  Boolean(formik.errors.numCuenta)
                }
                helperText={
                  formik.touched.numCuenta === true && formik.errors.numCuenta
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Accesos al Sistema</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="alias"
                label="Alias"
                fullWidth
                required
                type="text"
                size="small"
                value={formik.values.alias}
                onChange={formik.handleChange}
                error={
                  formik.touched.alias === true && Boolean(formik.errors.alias)
                }
                helperText={
                  formik.touched.alias === true && formik.errors.alias
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                required
                type="email"
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
              <TextField
                name="password"
                label="Contraseña"
                fullWidth
                required
                type="password"
                size="small"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password === true &&
                  Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password === true && formik.errors.password
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="repeatPassword"
                label="Repetir Contraseña"
                fullWidth
                required
                type="password"
                size="small"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.repeatPassword === true &&
                  Boolean(formik.errors.repeatPassword)
                }
                helperText={
                  formik.touched.repeatPassword === true &&
                  formik.errors.repeatPassword
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                disablePortal
                fullWidth
                size="small"
                id="categoria"
                options={categoriaUserAdmins}
                onChange={(event, value) => {
                  formik.setFieldValue('categoriaId', value?.id ?? null)
                }}
                getOptionLabel={(option) =>
                  option.nombre !== undefined ? option.nombre : ''
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Categoria"
                    required
                    value={formik.values.categoriaId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                multiple
                disablePortal
                fullWidth
                size="small"
                id="rol"
                options={roles}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    rolId: option.id
                  }))
                  formik.setFieldValue('roles', newValues)
                }}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Roles" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                multiple
                disablePortal
                fullWidth
                size="small"
                id="privilegio"
                options={privilegios}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    privilegioId: option.id
                  }))
                  formik.setFieldValue('privilegios', newValues)
                }}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Privilegios" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                multiple
                disablePortal
                fullWidth
                size="small"
                id="sucursal"
                options={sucursales}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    sucursalId: option.id
                  }))
                  formik.setFieldValue('sucursales', newValues)
                }}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Sucursales" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                multiple
                disablePortal
                fullWidth
                size="small"
                id="acuerdo"
                options={acuerdosUserAdmins}
                onChange={(event, value) => {
                  const newValues = value.map((option) => ({
                    acuerdoId: option.id
                  }))
                  formik.setFieldValue('acuerdos', newValues)
                }}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Acuerdos" />
                )}
              />
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
    )
  }
}

export default CreateFormUsuarioAdmin
