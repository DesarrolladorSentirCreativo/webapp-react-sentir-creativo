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
import { type IAcceso, type IRol, type IUserAdminPermisos } from '../../models'
import rolService from '../../services/rol.service'

const Roles: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IRol[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [permiso, setPermiso] = useState<IAcceso>()
  const [open, setOpen] = useState<boolean>(false)
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const rolesPreferences = getLocalStorage('rolesPreferences')
    const result = rolesPreferences ? JSON.parse(rolesPreferences) : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const rolesPreferences = getLocalStorage('rolesPreferences')
    const result = rolesPreferences ? JSON.parse(rolesPreferences) : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IRol>>>(
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
        accessorKey: 'descripcion',
        header: 'Descripción'
      }
    ],
    [data]
  )

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    const rolesPreferences = getLocalStorage('rolesPreferences')
    const result = rolesPreferences ? JSON.parse(rolesPreferences) : 'compact'

    if (result.density !== density) {
      setLocalStorage('rolesPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const rolesPreferences = getLocalStorage('rolesPreferences')
    const result = rolesPreferences ? JSON.parse(rolesPreferences) : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('rolesPreferences', {
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
      await rolService.deleteById(sucursalId)
      getSuccess('El rol fue eliminado correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('El rol no pudo ser eliminado')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await rolService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 22
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
    <Card title={'Listado de Roles'}>
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
                  navigate('/roles/nuevo')
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
                    navigate(`/roles/actualizar/${row.original.id}`)
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
        title={'Eliminar Rol'}
        message={'¿Está seguro que desea eliminar el rol?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default Roles
