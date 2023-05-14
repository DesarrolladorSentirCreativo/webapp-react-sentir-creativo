import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom, DialogButton } from '../../components/Controls'
import { useNotification } from '../../context'
import {
  getLocalStorage,
  setLocalStorage
} from '../../helpers/localstorage.helper'
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
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const organizacionesData = getLocalStorage('organizacionesData')
    const result = organizacionesData ? JSON.parse(organizacionesData) : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const organizacionesData = getLocalStorage('organizacionesData')
    const result = organizacionesData
      ? JSON.parse(organizacionesData)
      : 'compact'
    return result.density
  })

  useEffect(() => {
    const organizacionesData = getLocalStorage('organizacionesData')
    const result = organizacionesData
      ? JSON.parse(organizacionesData)
      : 'compact'
    setDensity(result.density)
    setColumnVisibility(result.columnVisibility)
    load()
  }, [])

  useEffect(() => {
    const organizacionesData = getLocalStorage('organizacionesData')
    const result = organizacionesData
      ? JSON.parse(organizacionesData)
      : 'compact'

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('organizacionesData', {
        density: result.density,
        columnVisibility
      })
    }
  }, [columnVisibility])

  useEffect(() => {
    const organizacionesData = getLocalStorage('organizacionesData')
    const result = organizacionesData
      ? JSON.parse(organizacionesData)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('organizacionesData', {
        density,
        columnVisibility: result.columnVisibility
      })
    }
  }, [density])

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
        enableHiding: true,
        header: 'ID',
        size: 10
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre'
      },
      {
        accessorKey: 'rubroId',
        enableHiding: true,
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

  const deleteRegister = async (): Promise<void> => {
    try {
      organizacionService.deleteById(comentarioId)
      getSuccess('La organización fue eliminada correctamente')
      await load()
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
          initialState={{ columnVisibility: { address: false } }}
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
