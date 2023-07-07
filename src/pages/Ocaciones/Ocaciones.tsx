import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import { type FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import { formatDate } from '../../helpers/date.helper'
import {
  getLocalStorage,
  setLocalStorage
} from '../../helpers/localstorage.helper'
import {
  type IAcceso,
  type IOcacion,
  type IUserAdminPermisos
} from '../../models'
import ocacionService from '../../services/ocacion.service'

const Ocaciones: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IOcacion[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [permiso, setPermiso] = useState<IAcceso>()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const ocacionesPreferences = getLocalStorage('ocacionesPreferences')
    const result = ocacionesPreferences ? JSON.parse(ocacionesPreferences) : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const ocacionesPreferences = getLocalStorage('ocacionesPreferences')
    const result = ocacionesPreferences
      ? JSON.parse(ocacionesPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IOcacion>>>(
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
        accessorKey: 'publishedAt',
        header: 'Fecha Creación',
        size: 200,
        Cell: ({ cell, row }) => {
          return (
            <span
              style={{
                display: 'flex',
                justifyContent: 'left'
              }}
            >
              {formatDate(new Date(row.original.publishedAt))}
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
    const ocacionesPreferences = getLocalStorage('ocacionesPreferences')
    const result = ocacionesPreferences
      ? JSON.parse(ocacionesPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('ocacionesPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const ocacionesPreferences = getLocalStorage('tecnicaArtisticasPreferences')
    const result = ocacionesPreferences ? JSON.parse(ocacionesPreferences) : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('ocacionesPreferences', {
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
      await ocacionService.deleteById(sucursalId)
      getSuccess('La Ocasión fue eliminado correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La Ocasión no pudo ser eliminado')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await ocacionService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 31
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
    <Card title={'Listado de Ocaciones'}>
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
                  navigate('/ocaciones/nuevo')
                }}
                variant="contained"
              >
                Crear Nuevo Registro
              </Button>
            ) : (
              <> </>
            )
          }
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              {permiso?.actualizar && (
                <IconButton
                  color="secondary"
                  onClick={() => {
                    navigate(`/ocaciones/actualizar/${row.original.id}`)
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
        title={'Eliminar Ocasión'}
        message={'¿Está seguro que desea eliminar la ocasión?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default Ocaciones
