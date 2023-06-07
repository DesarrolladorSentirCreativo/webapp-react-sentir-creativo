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
import { type IAcuerdoUserAdmin } from '../../models'
import acuerdoUserAdminService from '../../services/acuerdoUserAdmin.service'

const AcuerdosUserAdmin: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IAcuerdoUserAdmin[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const acuerdoUserAdminPreferences = getLocalStorage(
      'acuerdoUserAdminPreferences'
    )
    const result = acuerdoUserAdminPreferences
      ? JSON.parse(acuerdoUserAdminPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const acuerdoUserAdminPreferences = getLocalStorage(
      'acuerdoUserAdminPreferences'
    )
    const result = acuerdoUserAdminPreferences
      ? JSON.parse(acuerdoUserAdminPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IAcuerdoUserAdmin>>>(
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
    const acuerdosUserAdminPreferences = getLocalStorage(
      'acuerdosUserAdminPreferences'
    )
    const result = acuerdosUserAdminPreferences
      ? JSON.parse(acuerdosUserAdminPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('acuerdosUserAdminPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const acuerdosUserAdminPreferences = getLocalStorage(
      'acuerdosUserAdminPreferences'
    )
    const result = acuerdosUserAdminPreferences
      ? JSON.parse(acuerdosUserAdminPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('modulosPreferences', {
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
      await acuerdoUserAdminService.deleteById(sucursalId)
      getSuccess('El acuerdo fue eliminada correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('El acuerdo no pudo ser eliminada')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await acuerdoUserAdminService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    setIsLoading(true)
    await fetchData()
    setIsLoading(false)
  }

  return (
    <Card title={'Listado de Acuerdos'}>
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
                navigate('/acuerdos/nuevo')
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
                  navigate(`/acuerdos/actualizar/${row.original.id}`)
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
        title={'Eliminar Acuerdo'}
        message={'¿Está seguro que desea eliminar el acuerdo?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default AcuerdosUserAdmin
