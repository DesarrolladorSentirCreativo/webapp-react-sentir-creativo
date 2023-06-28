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
import useCategoriPrivilegio from '../../hooks/useCategoriaPrivilegio'
import {
  type IAcceso,
  type IPrivilegio,
  type IUserAdminPermisos
} from '../../models'
import privilegioService from '../../services/privilegio.service'

export const Privilegios: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<IPrivilegio[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [permiso, setPermiso] = useState<IAcceso>()
  const [open, setOpen] = useState<boolean>(false)
  const { categoriaPrivilegios, loadCategoriaPrivilegios } =
    useCategoriPrivilegio()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const privilegiosPreferences = getLocalStorage('privilegiosPreferences')
    const result = privilegiosPreferences
      ? JSON.parse(privilegiosPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const privilegiosPreferences = getLocalStorage('privilegiosPreferences')
    const result = privilegiosPreferences
      ? JSON.parse(privilegiosPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<IPrivilegio>>>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Nombre'
      },
      {
        accessorKey: 'categoriaId',
        header: 'Categoría',
        Cell: ({ cell, row }) => {
          const value = row.original.categoriaId
          const modulo = categoriaPrivilegios.find((item) => item.id === value)
          return (
            <span
              style={{
                display: 'flex',
                alignItems: 'left',
                textAlign: 'left',
                justifyContent: 'left'
              }}
            >
              {modulo?.nombre}
            </span>
          )
        }
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
    const privilegiosPreferences = getLocalStorage('privilegiosPreferences')
    const result = privilegiosPreferences
      ? JSON.parse(privilegiosPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('privilegiosPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const privilegiosPreferences = getLocalStorage('privilegiosPreferences')
    const result = privilegiosPreferences
      ? JSON.parse(privilegiosPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('privilegiosPreferences', {
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
      await privilegioService.deleteById(sucursalId)
      getSuccess('El privilegio fue eliminado correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('El privilegio no pudo ser eliminado')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await privilegioService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 13
      )

      if (desiredAccess?.ver) {
        setIsLoading(true)
        setPermiso(desiredAccess)
        await fetchData()
        await loadCategoriaPrivilegios()
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
    <Card title={'Listado de Privilegios'}>
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
                  navigate('/privilegios/nuevo')
                }}
                variant="contained"
              >
                Crear Nuevo Registro
              </Button>
            ) : (
              <></>
            )
          }
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
              {permiso?.actualizar && (
                <IconButton
                  color="secondary"
                  onClick={() => {
                    navigate(`/privilegios/actualizar/${row.original.id}`)
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
        title={'Eliminar Privilegio'}
        message={'¿Está seguro que desea eliminar el privilegio?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default Privilegios
