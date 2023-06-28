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
  type IModoTrabajo,
  type IUserAdminPermisos
} from '../../models'
import modoTrabajoService from '../../services/modoTrabajo.service'

const ModosTrabajos: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IModoTrabajo[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [permiso, setPermiso] = useState<IAcceso>()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const modoTrabajosPreferences = getLocalStorage('modoTrabajoPreferences')
    const result = modoTrabajosPreferences
      ? JSON.parse(modoTrabajosPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const modoTrabajosPreferences = getLocalStorage('modoTrabajoPreferences')
    const result = modoTrabajosPreferences
      ? JSON.parse(modoTrabajosPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IModoTrabajo>>>(
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
    const modoTrabajoPreferences = getLocalStorage('modoTrabajoPreferences')
    const result = modoTrabajoPreferences
      ? JSON.parse(modoTrabajoPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('modoTrabajoPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const modoTrabajoPreferences = getLocalStorage('modoTrabajoPreferences')
    const result = modoTrabajoPreferences
      ? JSON.parse(modoTrabajoPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('modoTrabajoPreferences', {
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
      await modoTrabajoService.deleteById(sucursalId)
      getSuccess('El Modo de Trabajo fue eliminado correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('El Modo de Trabajo no pudo ser eliminado')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await modoTrabajoService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 23
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
    <Card title={'Listado de Modos de Trabajos'}>
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
                  navigate('/modos-trabajos/nuevo')
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
                    navigate(`/modos-trabajos/actualizar/${row.original.id}`)
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
        title={'Eliminar Afp'}
        message={'¿Está seguro que desea eliminar el Modo de Trabajo?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default ModosTrabajos
