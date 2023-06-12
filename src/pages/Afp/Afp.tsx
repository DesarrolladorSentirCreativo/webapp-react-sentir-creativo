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
import { type IAfp } from '../../models'
import afpService from '../../services/afp.service'

const Afp: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IAfp[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const afpPreferences = getLocalStorage('afpPreferences')
    const result = afpPreferences ? JSON.parse(afpPreferences) : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const afpPreferences = getLocalStorage('afpPreferences')
    const result = afpPreferences ? JSON.parse(afpPreferences) : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IAfp>>>(
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
    const afpPreferences = getLocalStorage('afpPreferences')
    const result = afpPreferences ? JSON.parse(afpPreferences) : 'compact'

    if (result.density !== density) {
      setLocalStorage('afpPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const afpPreferences = getLocalStorage('afpPreferences')
    const result = afpPreferences ? JSON.parse(afpPreferences) : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('afpPreferences', {
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
      await afpService.deleteById(sucursalId)
      getSuccess('La AFP fue eliminada correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La AFP no pudo ser eliminada')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await afpService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    setIsLoading(true)
    await fetchData()
    setIsLoading(false)
  }

  return (
    <Card title={'Listado de afp'}>
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
                navigate('/afp/nuevo')
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
                  navigate(`/afp/actualizar/${row.original.id}`)
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
        title={'Eliminar Afp'}
        message={'¿Está seguro que desea eliminar la AFP?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default Afp
