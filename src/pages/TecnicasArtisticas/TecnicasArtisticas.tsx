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
  type ITecnicaArtistica,
  type IUserAdminPermisos
} from '../../models'
import tecnicaArtisticaService from '../../services/tecnicaArtistica.service'

const TecnicasArtisticas: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ITecnicaArtistica[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [permiso, setPermiso] = useState<IAcceso>()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const tecnicaArtisticasPreferences = getLocalStorage(
      'tecnicaArtisticasPreferences'
    )
    const result = tecnicaArtisticasPreferences
      ? JSON.parse(tecnicaArtisticasPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const tecnicaArtisticasPreferences = getLocalStorage(
      'tecnicaArtisticasPreferences'
    )
    const result = tecnicaArtisticasPreferences
      ? JSON.parse(tecnicaArtisticasPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<ITecnicaArtistica>>>(
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
    const tecnicaArtisticasPreferences = getLocalStorage(
      'tecnicaArtisticasPreferences'
    )
    const result = tecnicaArtisticasPreferences
      ? JSON.parse(tecnicaArtisticasPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('tecnicaArtisticasPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const tecnicaArtisticasPreferences = getLocalStorage(
      'tecnicaArtisticasPreferences'
    )
    const result = tecnicaArtisticasPreferences
      ? JSON.parse(tecnicaArtisticasPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('tecnicaArtisticasPreferences', {
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
      await tecnicaArtisticaService.deleteById(sucursalId)
      getSuccess('La tecnica artistica fue eliminada correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La tecnica artistica no pudo ser eliminada')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await tecnicaArtisticaService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 30
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
    <Card title={'Listado de Tecnicas Artisticas'}>
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
                  navigate('/tecnicas-artisticas/nuevo')
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
                    navigate(
                      `/tecnicas-artisticas/actualizar/${row.original.id}`
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
        title={'Eliminar Tecnica Artistica'}
        message={'¿Está seguro que desea eliminar la tecnica artistica?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default TecnicasArtisticas
