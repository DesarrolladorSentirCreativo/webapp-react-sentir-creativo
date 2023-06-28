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
import useModulo from '../../hooks/useModulo'
import {
  type IAcceso,
  type IColeccionUserAdminDataGrid,
  type IUserAdminPermisos
} from '../../models'
import coleccionUserAdminService from '../../services/coleccionUserAdmin.service'

const ColeccionesUserAdmin: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IColeccionUserAdminDataGrid[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [permiso, setPermiso] = useState<IAcceso>()
  const { loadModulos, modulos } = useModulo()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const coleccionesUserAdminPreferences = getLocalStorage(
      'coleccionesUserAdminPreferences'
    )
    const result = coleccionesUserAdminPreferences
      ? JSON.parse(coleccionesUserAdminPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const coleccionesUserAdminPreferences = getLocalStorage(
      'coleccionesUserAdminPreferences'
    )
    const result = coleccionesUserAdminPreferences
      ? JSON.parse(coleccionesUserAdminPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IColeccionUserAdminDataGrid>>>(
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
        accessorKey: 'moduloId',
        header: 'Modulo',
        Cell: ({ cell, row }) => {
          const value = row.original.moduloId
          const modulo = modulos.find((item) => item.id === value)
          return (
            <span
              style={{
                display: 'flex',
                alignItems: 'left',
                textAlign: 'left',
                justifyContent: 'left'
              }}
            >
              {modulo?.nombre}
            </span>
          )
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

  useEffect(() => {
    const coleccionesUserAdminPreferences = getLocalStorage(
      'coleccionesUserAdminPreferences'
    )
    const result = coleccionesUserAdminPreferences
      ? JSON.parse(coleccionesUserAdminPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('coleccionesUserAdminPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const coleccionesUserAdminPreferences = getLocalStorage(
      'coleccionesUserAdminPreferences'
    )
    const result = coleccionesUserAdminPreferences
      ? JSON.parse(coleccionesUserAdminPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('coleccionesUserAdminPreferences', {
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
      await coleccionUserAdminService.deleteById(sucursalId)
      getSuccess('La colección fue eliminada correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La colección no pudo ser eliminada')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await coleccionUserAdminService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 29
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
        loadModulos()
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
    <Card title={'Listado de Colecciones'}>
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
                  navigate('/colecciones/nuevo')
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
                    navigate(`/colecciones/actualizar/${row.original.id}`)
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
        title={'Eliminar Colección'}
        message={'¿Está seguro que desea eliminar el colección?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default ColeccionesUserAdmin
