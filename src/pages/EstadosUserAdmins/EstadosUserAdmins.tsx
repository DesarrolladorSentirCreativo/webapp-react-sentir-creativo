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
import {
  type IAcceso,
  type IEstadoUserAdmin,
  type IUserAdminPermisos
} from '../../models'
import estadoUserAdminService from '../../services/estadoUserAdmin.service'

const EstadosUserAdmins: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IEstadoUserAdmin[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [permiso, setPermiso] = useState<IAcceso>()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const estadoUserAdminPreferences = getLocalStorage(
      'estadoUserAdminPreferences'
    )
    const result = estadoUserAdminPreferences
      ? JSON.parse(estadoUserAdminPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const estadoUserAdminPreferences = getLocalStorage(
      'estadoUserAdminPreferences'
    )
    const result = estadoUserAdminPreferences
      ? JSON.parse(estadoUserAdminPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IEstadoUserAdmin>>>(
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
        accesorKey: 'color',
        header: 'Color',
        Cell: ({ cell, row }) => {
          const value = row.original.color
          return <span>{value}</span>
        }
      },
      {
        accessorKey: 'descripcion',
        header: 'Descripción'
      }
    ],
    [data]
  )

  useEffect(() => {
    load()
  }, [])

  console.log(data)
  useEffect(() => {
    const estadoUserAdminPreferences = getLocalStorage(
      'estadoUserAdminPreferences'
    )
    const result = estadoUserAdminPreferences
      ? JSON.parse(estadoUserAdminPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('estadoUserAdminPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const estadoUserAdminPreferences = getLocalStorage(
      'estadoUserAdminPreferences'
    )
    const result = estadoUserAdminPreferences
      ? JSON.parse(estadoUserAdminPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('estadoUserAdminPreferences', {
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
      await estadoUserAdminService.deleteById(sucursalId)
      getSuccess('El Estado de Usuarios fue eliminado correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('El Estado de Usuarios no pudo ser eliminado')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await estadoUserAdminService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 27
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
        setPermiso(desiredAccess)
        await fetchData()
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
    <Card title={'Listado de estados de usuarios'}>
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
                  navigate('/estados-useradmins/nuevo')
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
                    navigate(
                      `/estados-useradmins/actualizar/${row.original.id}`
                    )
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
        title={'Eliminar Estado de Usuarios'}
        message={'¿Está seguro que desea eliminar el estado de usuario?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default EstadosUserAdmins
