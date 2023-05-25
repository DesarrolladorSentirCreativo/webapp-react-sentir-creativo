import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, IconButton } from '@mui/material'
import { type MRT_ColumnDef } from 'material-react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Card, DataGridCustom } from '../../components/Controls'
import { useNotification } from '../../context'
import {
  getLocalStorage,
  setLocalStorage
} from '../../helpers/localstorage.helper'
import { type ICategoriaPrivilegio } from '../../models'
import categoriaPrivilegioService from '../../services/categoriaPrivilegio.service'
import DialogButton from './../../components/Controls/Buttons/DialogButton/DialogButton'

const CategoriasPrivilegios: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ICategoriaPrivilegio[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const categoriasPrivilegiosPreferences = getLocalStorage(
      'categoriasPrivilegiosPreferences'
    )
    const result = categoriasPrivilegiosPreferences
      ? JSON.parse(categoriasPrivilegiosPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const categoriasPrivilegiosPreferences = getLocalStorage(
      'categoriasPrivilegiosPreferences'
    )
    const result = categoriasPrivilegiosPreferences
      ? JSON.parse(categoriasPrivilegiosPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<ICategoriaPrivilegio>>>(
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
    const categoriasPrivilegiosPreferences = getLocalStorage(
      'categoriasPrivilegiosPreferences'
    )
    const result = categoriasPrivilegiosPreferences
      ? JSON.parse(categoriasPrivilegiosPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('categoriasPrivilegiosPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const categoriasPrivilegiosPreferences = getLocalStorage(
      'categoriasPrivilegiosPreferences'
    )
    const result = categoriasPrivilegiosPreferences
      ? JSON.parse(categoriasPrivilegiosPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('categoriasPrivilegiosPreferences', {
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
      await categoriaPrivilegioService.deleteById(sucursalId)
      getSuccess('La categoría de privilegio fue eliminada correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La categoría de privilegio no pudo ser eliminada')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await categoriaPrivilegioService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    setIsLoading(true)
    await fetchData()
    setIsLoading(false)
  }

  return (
    <Card title={'Listado de Categorías de Privilegios'}>
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
                navigate('/categorias-privilegios/nuevo')
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
                  navigate(
                    `/categorias-privilegios/actualizar/${row.original.id}`
                  )
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setSucursalId(row.original.id)
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
        title={'Eliminar Categoría de Privilegio'}
        message={'¿Está seguro que desea eliminar la categoría de privilegio?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default CategoriasPrivilegios
