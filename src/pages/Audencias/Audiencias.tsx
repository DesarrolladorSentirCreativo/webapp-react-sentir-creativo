import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import { formatDate } from '../../helpers/date.helper'
import {
  getLocalStorage,
  setLocalStorage
} from '../../helpers/localstorage.helper'
import { useEstadoAudiencia, useOrganizacion } from '../../hooks'
import { type Audiencia } from '../../models'
import audienciaService from '../../services/audiencia.service'

const Audiencias: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { getError, getSuccess } = useNotification()
  const [data, setData] = useState<Audiencia[]>([])
  const { loadEstadoAudiencias, estadoAudiencias } = useEstadoAudiencia()
  const { loadOrganizaciones, organizaciones } = useOrganizacion()
  const [audienciaId, setAudienciaId] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const audienciasPreferences = getLocalStorage('audienciasPreferences')
    const result = audienciasPreferences
      ? JSON.parse(audienciasPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const audienciasPreferences = getLocalStorage('audienciasPreferences')
    const result = audienciasPreferences
      ? JSON.parse(audienciasPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<Audiencia>>>(
    () => [
      {
        accessorKey: 'id',
        enableHiding: true,
        header: 'ID',
        size: 10
      },
      {
        accessorKey: 'estadoId',
        enableHiding: false,
        header: 'Estado Audiencia',
        minSize: 100,
        maxSize: 200,
        size: 180,
        Cell: ({ cell, row }) => {
          const value = estadoAudiencias.find(
            (estadoAudiencia) => estadoAudiencia.id === row.original.estadoId
          )
          return (
            <span
              style={{
                backgroundColor: value?.color ?? '#fff',
                color: '#fff',
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
        accessorKey: 'nombre',
        header: 'Nombre'
      },
      {
        accessorKey: 'apellido',
        header: 'Apellido'
      },
      {
        accessorKey: 'organizaciones',
        header: 'Organización',
        Cell: ({ cell, row }) => {
          const value = row.original.organizaciones[0]
          const organizacion = organizaciones.find(
            (item) => item.id === value.organizacionId
          )
          return (
            <span
              style={{
                display: 'flex',
                alignItems: 'left',
                textAlign: 'left',
                justifyContent: 'left'
              }}
            >
              {organizacion?.nombre}
            </span>
          )
        }
      },
      {
        accessorKey: 'celular',
        header: 'Telefono'
      },
      {
        accessorKey: 'email',
        header: 'Email'
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

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  useEffect(() => {
    const audienciasPreferences = getLocalStorage('audienciasPreferences')
    const result = audienciasPreferences
      ? JSON.parse(audienciasPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('audienciasPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const audienciasPreferences = getLocalStorage('audienciasPreferences')
    const result = audienciasPreferences
      ? JSON.parse(audienciasPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('audienciasPreferences', {
        density: result.density,
        columnVisibility
      })
    }
  }, [columnVisibility])

  const fetchData = async (): Promise<void> => {
    const result = await audienciaService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    setIsLoading(true)
    await loadEstadoAudiencias()
    await loadOrganizaciones()
    await fetchData()
    setIsLoading(false)
  }

  const deleteRegister = async (): Promise<void> => {
    try {
      await audienciaService.deleteById(audienciaId)
      getSuccess('La audiencia fue eliminada correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La audiencia no pudo ser eliminada')
    }
  }
  return (
    <Card title={'Listado de Audiencias'}>
      <Box width="100%" display="flex" flexDirection="column">
        <DataGridCustom
          data={data}
          columns={columns}
          enableRowActions={true}
          onColumnVisibilityChange={setColumnVisibility}
          onDensityChange={setDensity}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                navigate('/audiencias/nuevo')
              }}
              variant="contained"
            >
              Crear Nuevo Registro
            </Button>
          )}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton
                color="secondary"
                onClick={() => {
                  navigate(`/audiencias/actualizar/${row.original.id}`)
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setAudienciaId(row.original.id)
                  handleOpen()
                }}
              >
                <DeleteIcon />
              </IconButton>
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
        title={'Eliminar Audiencia'}
        message={'¿Está seguro que desea eliminar la audiencia?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default Audiencias
