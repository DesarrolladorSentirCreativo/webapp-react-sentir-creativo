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
import {
  type IAcceso,
  type ICategoriaUserAdmin,
  type IUserAdminPermisos
} from '../../models'
import categoriaUserAdminService from '../../services/categoriaUserAdmin.service'

const CategoriaUserAdmins: FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<ICategoriaUserAdmin[]>([])
  const [sucursalId, setSucursalId] = useState<number>(0)
  const { getSuccess, getError } = useNotification()
  const [open, setOpen] = useState<boolean>(false)
  const [permiso, setPermiso] = useState<IAcceso>()
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const categoriasUserAdminsPreferences = getLocalStorage(
      'categoriasUserAdminsPreferences'
    )
    const result = categoriasUserAdminsPreferences
      ? JSON.parse(categoriasUserAdminsPreferences)
      : {}
    return result.columnVisibility
  })
  const [density, setDensity] = useState(() => {
    const categoriasUserAdminsPreferences = getLocalStorage(
      'categoriasUserAdminsPreferences'
    )
    const result = categoriasUserAdminsPreferences
      ? JSON.parse(categoriasUserAdminsPreferences)
      : 'compact'
    return result.density
  })

  const columns = useMemo<Array<MRT_ColumnDef<ICategoriaUserAdmin>>>(
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
    const categoriasUserAdminsPreferences = getLocalStorage(
      'categoriasUserAdminsPreferences'
    )
    const result = categoriasUserAdminsPreferences
      ? JSON.parse(categoriasUserAdminsPreferences)
      : 'compact'

    if (result.density !== density) {
      setLocalStorage('categoriasUserAdminsPreferences', {
        columnVisibility: result.columnVisibility,
        density
      })
    }
  }, [density])

  useEffect(() => {
    const categoriasUserAdminsPreferences = getLocalStorage(
      'categoriasUserAdminsPreferences'
    )
    const result = categoriasUserAdminsPreferences
      ? JSON.parse(categoriasUserAdminsPreferences)
      : {}

    if (result.columnVisibility !== columnVisibility) {
      setLocalStorage('categoriasUserAdminsPreferences', {
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
      await categoriaUserAdminService.deleteById(sucursalId)
      getSuccess('La categoría de usuarios fue eliminada correctamente')
      await load()
    } catch (error) {
      console.log('Mi error', error)
      getError('La categoría de usuarios no pudo ser eliminada')
    }
  }

  const fetchData = async (): Promise<void> => {
    const result = await categoriaUserAdminService.getAll()
    setData(result)
  }

  const load = async (): Promise<void> => {
    try {
      const userData = getLocalStorage('user')
      const userPermissions: IUserAdminPermisos = userData
        ? JSON.parse(userData)
        : null
      const desiredAccess = userPermissions?.accesos.find(
        (acceso) => acceso.coleccionId === 26
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
    <Card title={'Listado de Categorías de Usuarios'}>
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
                  navigate('/categorias-usuarios/nuevo')
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
                    navigate(
                      `/categorias-usuarios/actualizar/${row.original.id}`
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
        title={'Eliminar Categoría de Usuario'}
        message={'¿Está seguro que desea eliminar la categoría de usuario?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteRegister}
      />
    </Card>
  )
}

export default CategoriaUserAdmins
