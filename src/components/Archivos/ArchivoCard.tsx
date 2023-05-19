import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'
import { useState } from 'react'

import { useNotification } from '../../context'
import { type IArchivo } from '../../models'
import archivoService from '../../services/archivo.service'
import DialogButton from './../Controls/Buttons/DialogButton/DialogButton'

interface IArchivoCardProps {
  archivos: IArchivo[]
  verArchivo: (
    id: number,
    nombre: string,
    path: string,
    tipoArchivoId: number | null,
    publico: boolean
  ) => void
  remove: (id: number) => void
}

const ArchivoCard: React.FC<IArchivoCardProps> = (props: IArchivoCardProps) => {
  const isImage = (path: string): boolean =>
    ['.png', '.jpg', '.jpeg', '.gif', '.tiff'].some((ext) => path.includes(ext))
  const [open, setOpen] = useState<boolean>(false)
  const [idArchivo, setIdArchivo] = useState<number>(0)
  const { getSuccess, getError } = useNotification()

  const handleLink = (path: string): void => {
    window.open(path, '_blank')
  }
  const { archivos, verArchivo, remove } = props

  const deleteArchivo = async (): Promise<void> => {
    try {
      await archivoService.deleteById(idArchivo)
      remove(idArchivo)
      getSuccess('Archivo se elimino correctamente')
    } catch (error) {
      console.log(error)
      getError('Archivo no se elimino correctamente')
    }
  }

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        justifyContent="flex-end"
        style={{ marginBottom: 16 }}
        padding={2}
      >
        <Grid container spacing={4}>
          {archivos?.map((x: IArchivo) => (
            <Grid item md={3} xs={6} sm={4} lg={2} key={x.id}>
              <Card
                key={x.id}
                style={{
                  maxWidth: 180,
                  margin: 8,
                  height: '250px',
                  minHeight: '250px',
                  maxHeight: '250px'
                }}
              >
                {isImage(x.path) && (
                  <CardMedia
                    component="img"
                    alt="file"
                    height="120"
                    image={x.path}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {x.nombre}
                  </Typography>
                  {x.tipoArchivo !== null && (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      component="div"
                    >
                      {x.tipoArchivo}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      md={6}
                      display="flex"
                      justifyContent={'center'}
                      textAlign={'center'}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          verArchivo(
                            x.id,
                            x.nombre,
                            x.path,
                            x.tipoArchivoId,
                            x.publico
                          )
                        }}
                      >
                        Ver
                      </Button>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      display="flex"
                      justifyContent={'center'}
                      textAlign={'center'}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          handleLink(x.path)
                        }}
                      >
                        Abrir Link
                      </Button>
                    </Grid>
                    <Grid
                      item
                      md={12}
                      display="flex"
                      justifyContent={'center'}
                      textAlign={'center'}
                    >
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          setIdArchivo(x.id)
                          handleOpen()
                        }}
                        disabled={false}
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <DialogButton
        open={open}
        onClose={handleClose}
        title={'Eliminar Archivo'}
        message={'¿Está seguro que desea eliminar el archivo?'}
        confirmButtonText={'Eliminar'}
        cancelButtonText={'Cancelar'}
        onConfirm={deleteArchivo}
      />
    </>
  )
}

export default ArchivoCard
