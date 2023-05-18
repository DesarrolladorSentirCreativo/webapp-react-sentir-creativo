import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material'

import { type IArchivo } from '../../models'

interface IArchivoCardProps {
  archivos: IArchivo[]
  verArchivo: (
    id: number,
    nombre: string,
    path: string,
    tipoArchivoId: number | null,
    publico: boolean
  ) => void
}

const ArchivoCard: React.FC<IArchivoCardProps> = (props: IArchivoCardProps) => {
  const isImage = (path: string): boolean =>
    ['.png', '.jpg', '.jpeg', '.gif', '.tiff'].some((ext) => path.includes(ext))

  const handleLink = (path: string): void => {
    window.open(path, '_blank')
  }
  const { archivos, verArchivo } = props
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
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleLink(x.path)
                    }}
                  >
                    Abir Link
                  </Button>
                </CardActions>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default ArchivoCard
