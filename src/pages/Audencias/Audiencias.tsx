import { Box, Button } from '@mui/material'
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card } from '../../components/Controls'
import { useEstadoAudiencia } from '../../hooks'
import { type Audiencia } from '../../models'
import audienciaService from '../../services/audiencia.service'

const Audiencias: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Audiencia[]>([])
  const { loadEstadoAudiencias, estadoAudiencias } = useEstadoAudiencia()

  const columns = useMemo<Array<MRT_ColumnDef<Audiencia>>>(
    () => [
      {
        accessorKey: 'id',
        enableHiding: false,
        header: 'ID'
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
                alignItems: 'center',
                justifyContent: 'center'
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
        accessorKey: 'celular',
        header: 'Telefono'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      }
    ],
    [data]
  )

  useEffect(() => {
    loadEstadoAudiencias()
    fetchData()
  }, [])

  const fetchData = async (): Promise<void> => {
    setIsLoading(true)
    const result = await audienciaService.getAll()
    setData(result)
    setIsLoading(false)
  }

  return (
    <Card title={'Listado de Audiencias'}>
      <Box width="100%" display="flex" flexDirection="column">
        <MaterialReactTable
          localization={MRT_Localization_ES}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                navigate('/audiencias/nuevo')
              }}
              variant="contained"
            >
              Crear nueva Audiencia
            </Button>
          )}
          columns={columns}
          data={data}
          initialState={{ columnVisibility: { address: false } }}
          muiTableFooterProps={{
            sx: (theme) => ({
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.background.paper
            })
          }}
          muiTableHeadCellColumnActionsButtonProps={{
            sx: (theme) => ({
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.background.paper
            })
          }}
          muiTableBodyCellProps={{
            sx: (theme) => ({
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.background.paper
            })
          }}
          muiTableHeadCellProps={{
            sx: (theme) => ({
              color: theme.palette.text.secondary,
              backgroundColor: theme.palette.background.paper
            })
          }}
          state={{
            isLoading
          }}
        />
      </Box>
    </Card>
  )
}

export default Audiencias
