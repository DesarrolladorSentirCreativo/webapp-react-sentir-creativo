import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import { type FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { DataGridCustom, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import { formatDate } from '../../helpers/date.helper'
import {
  getLocalStorage,
  setLocalStorage
} from '../../helpers/localstorage.helper'
import { type IAcceso, type IUserAdminPermisos } from '../../models'
import { type IFormato } from '../../models/formato'
import formatoService from '../../services/formato.service'
import Card from './../../components/Controls/Card/Card'

export const Formatos: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IFormato[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [permiso, setPermiso] = useState<IAcceso>()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const formatosPreferences = getLocalStorage('formatosPreferences')
    const result = formatosPreferences ? JSON.parse(formatosPreferences) : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const formatosPreferences = getLocalStorage('formatosPreferences')
    const result = formatosPreferences
      ? JSON.parse(formatosPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IFormato>>>(
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
    const formatosPreferences = getLocalStorage('formatosPreferences')
    const result = formatosPreferences
      ? JSON.parse(formatosPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('formatosPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const formatosPreferences = getLocalStorage('formatosPreferences')
    const result = formatosPreferences ? JSON.parse(formatosPreferences) : {}

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
      await formatoService.deleteById(sucursalId)
      getSuccess('El formato fue eliminado correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('El formato no pudo ser eliminado')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await formatoService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 34
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
    <Card title={'Listado de Formatos'}>
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
                  navigate('/formatos/nuevo')
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
                    navigate(`/formatos/actualizar/${row.original.id}`)
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
        title={'Eliminar Formato'}
        message={'¿Está seguro que desea eliminar el formato?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default Formatos
