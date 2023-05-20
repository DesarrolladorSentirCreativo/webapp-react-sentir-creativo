import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

import { useNotification } from '../../context'
import { signS3Url } from '../../helpers/aws.helper'
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
  const [loadedArchivos, setLoadedArchivos] = useState<IArchivo[]>([])
  const { archivos, verArchivo, remove } = props

  useEffect(() => {
    const fetchArchivos = async (): Promise<void> => {
      const archivosData = await loadImages(archivos)
      setLoadedArchivos(archivosData)
    }

    fetchArchivos()
  }, [archivos])

  const handleLink = (path: string): void => {
    window.open(path, '_blank')
  }

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

  const loadImages = async (archivos: IArchivo[]): Promise<IArchivo[]> => {
    const isFromS3 = (path: string): boolean =>
      path.includes('sentircreativo.s3')
    const loadedArchivos = await Promise.all(
      archivos.map(async (x) => {
        const imagePath = x.publico
          ? x.path
          : isFromS3(x.path)
          ? await signS3Url(x.path)
          : x.path
        return { ...x, imagePath }
      })
    )
    return loadedArchivos
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
          {loadedArchivos?.map((x: IArchivo) => (
            <Grid item md={3} xs={12} sm={4} lg={3} key={x.id}>
              <Card
                key={x.id}
                style={{
                  maxWidth: 300,
                  margin: 8,
                  height: '350px',
                  minHeight: '350px',
                  maxHeight: '350px'
                }}
              >
                {isImage(x.path) && (
                  <CardMedia
                    component="img"
                    alt="file"
                    height="200"
                    image={x.publico ? x.path : x.imagePath}
                    src={x.path ? x.path : x.imagePath}
                    sx={{
                      width: '100%',
                      height: '150px',
                      maxHeight: '200px',
                      objectFit: 'cover'
                    }}
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
                          const path =
                            x.publico !== null && !x.publico
                              ? x.path
                              : x.imagePath
                          verArchivo(
                            x.id,
                            x.nombre,
                            path ?? '',
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
                          const path = x.publico
                            ? x.path
                            : x.imagePath
                            ? x.imagePath
                            : ''
                          handleLink(path)
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
