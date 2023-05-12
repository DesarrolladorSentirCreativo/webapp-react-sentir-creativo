import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Card, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import { useRubro } from '../../hooks'
import { type IOrganizacion } from '../../models'
import { setOrganizacionDataGrid } from '../../redux/states/organizacion'
import organizacionService from '../../services/organizacion.service'

const Organizaciones: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loadRubros, rubros } = useRubro()
  const { getError, getSuccess } = useNotification()
  const [data, setData] = useState<IOrganizacion[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [comentarioId, setComentarioId] = useState<number>(0)

  useEffect(() => {
    load()
  }, [])

  const load = async (): Promise<void> => {
    setIsLoading(true)
    await loadRubros()
    await loadData()
    setIsLoading(false)
  }
  const columns = useMemo<Array<MRT_ColumnDef<IOrganizacion>>>(
    () => [
      {
        accessorKey: 'id',
        enableHiding: false,
        header: 'ID'
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre'
      },
      {
        accessorKey: 'rubroId',
        enableHiding: false,
        header: 'Rubro',
        Cell: ({ cell, row }) => {
          const value = rubros.find(
            (rubro) => rubro.id === row.original.rubroId
          )
          return (
            <span
              style={{
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
        accessorKey: 'email',
        header: 'Email'
      },
      {
        accessorKey: 'facebook',
        header: 'Facebook'
      },
      {
        accessorKey: 'instagram',
        header: 'Instagram'
      },
      {
        accessorKey: 'website',
        header: 'Pagina web'
      }
    ],
    [data]
  )
  const loadData = async (): Promise<void> => {
    try {
      const data = await organizacionService.getAll()
      setData(data)
      dispatch(setOrganizacionDataGrid(data))
    } catch (error) {
      console.log('Mi error', error)
    }
  }

  const deleteRegister = (): void => {
    try {
      organizacionService.deleteById(comentarioId)
      getSuccess('La organización fue eliminada correctamente')
      load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La organización no pudo ser eliminada')
    }
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }
  return (
    <Card title={'Listado de Organizaciones'}>
      <Box sx={{ width: '100%' }}>
        <MaterialReactTable
          localization={MRT_Localization_ES}
          enableRowActions
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              size="small"
              onClick={() => {
                navigate('/organizaciones/nuevo')
              }}
              variant="contained"
            >
              Crear nueva Organización
            </Button>
          )}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              <IconButton
                color="secondary"
                onClick={() => {
                  navigate(`/organizaciones/actualizar/${row.original.id}`)
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setComentarioId(row.original.id)
                  handleOpen()
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          columns={columns}
          data={data}
          initialState={{ columnVisibility: { address: false } }}
          muiTableProps={{
            sx: {
              width: '800px'
            }
          }}
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
      <DialogButton
        open={open}
        onClose={handleClose}
        title={'Eliminar Organización'}
        message={'¿Está seguro que desea eliminar la organización?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default Organizaciones
