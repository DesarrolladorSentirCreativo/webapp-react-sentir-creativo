import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import { type FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import {
  getLocalStorage,
  setLocalStorage
} from '../../helpers/localstorage.helper'
import { useDireccion } from '../../hooks'
import {
  type IAcceso,
  type IUserAdminPermisos,
  type IUsuarioAdmin
} from '../../models'
import userAdminService from '../../services/userAdmin.service'

export const UsuariosAdmin: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IUsuarioAdmin[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [permiso, setPermiso] = useState<IAcceso>()
  const [open, setOpen] = useState<boolean>(false)
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const usuariosAdminPreferences = getLocalStorage('usuariosAdminPreferences')
    const result = usuariosAdminPreferences
      ? JSON.parse(usuariosAdminPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const usuariosAdminPreferences = getLocalStorage('usuariosAdminPreferences')
    const result = usuariosAdminPreferences
      ? JSON.parse(usuariosAdminPreferences)
      : 'compact'
    return result.density
  })
  const { paises, loadPaises, loadRegiones, regiones, loadCiudades, ciudades } =
    useDireccion()

  const columns = useMemo<Array<MRT_ColumnDef<IUsuarioAdmin>>>(
    () => [
      {
        accessorKey: 'id',
        enableHiding: true,
        header: 'ID',
        size: 10
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre'
      },
      {
        accessorKey: 'apellidos',
        header: 'Apellidos'
      },
      {
        accessorKey: 'tipoDocumento',
        header: 'Tipo Documento'
      },
      {
        accessorKey: 'numDocumento',
        header: 'Documento Identidad'
      },
      {
        accessorKey: 'direccion',
        header: 'Dirección'
      },
      {
        accessorKey: 'ciudadId',
        enableHiding: true,
        header: 'Ciudad',
        Cell: ({ cell, row }) => {
          const value = ciudades.find(
            (ciudad) => ciudad.id === row.original.ciudadId
          )
          return (
            <span
              style={{
                padding: '2px',
                borderRadius: '1px',
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left'
              }}
            >
              {value?.nombre}
            </span>
          )
        }
      },
      {
        accessorKey: 'regionId',
        enableHiding: true,
        header: 'Región',
        Cell: ({ cell, row }) => {
          const value = regiones.find(
            (region) => region.id === row.original.regionId
          )
          return (
            <span
              style={{
                padding: '2px',
                borderRadius: '1px',
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left'
              }}
            >
              {value?.nombre}
            </span>
          )
        }
      },
      {
        accessorKey: 'paisId',
        enableHiding: true,
        header: 'País',
        Cell: ({ cell, row }) => {
          const value = paises.find((pais) => pais.id === row.original.paisId)
          return (
            <span
              style={{
                padding: '2px',
                borderRadius: '1px',
                display: 'flex',
                alignItems: 'left',
                justifyContent: 'left'
              }}
            >
              {value?.nombre}
            </span>
          )
        }
      }
    ],
    [data]
  )

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    const usuariosAdminPreferences = getLocalStorage('usuariosAdminPreferences')
    const result = usuariosAdminPreferences
      ? JSON.parse(usuariosAdminPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('usuariosAdminPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const usuariosAdminPreferences = getLocalStorage('usuariosAdminPreferences')
    const result = usuariosAdminPreferences
      ? JSON.parse(usuariosAdminPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('usuariosAdminPreferences', {
        density: result.density,
        columnVisibility
      })
    }
  }, [columnVisibility])

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  const deleteRegister = async (): Promise<void> => {
    try {
      await userAdminService.deleteById(sucursalId)
      getSuccess('El usuario fue eliminado correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('El usuario no pudo ser eliminado')
    }
  }

  const load = async (): Promise<void> => {
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
        await loadCiudades()
        await loadPaises()
        await loadRegiones()
        const result = await userAdminService.getAll()
        setData(result)
        setPermiso(desiredAccess)
      } else {
        navigate('/home')
      }
    } catch (error) {
      console.log('Mi error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card title={'Listado de Usuarios'}>
      <Box width="100%" display="flex" flexDirection="column">
        <DataGridCustom
          data={data}
          columns={columns}
          enableRowActions={true}
          onColumnVisibilityChange={setColumnVisibility}
          onDensityChange={setDensity}
          renderTopToolbarCustomActions={() =>
            permiso?.crear ? (
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  navigate('/usuarios/nuevo')
                }}
                variant="contained"
              >
                Crear Nuevo Registro
              </Button>
            ) : (
              <></>
            )
          }
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              {permiso?.actualizar && (
                <IconButton
                  color="secondary"
                  onClick={() => {
                    navigate(`/usuarios/actualizar/${row.original.id}`)
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
              {permiso?.eliminar && (
                <IconButton
                  color="error"
                  onClick={() => {
                    setSucursalId(row.original.id)
                    handleOpen()
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          )}
          initialState={{}}
          state={{
            isLoading,
            columnVisibility,
            density
          }}
        />
      </Box>
      <DialogButton
        open={open}
        onClose={handleClose}
        title={'Eliminar Usuario'}
        message={'¿Está seguro que desea eliminar el usuario?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default UsuariosAdmin
