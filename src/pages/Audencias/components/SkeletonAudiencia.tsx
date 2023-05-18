import { Box, Card, Grid, Skeleton } from '@mui/material'

const SkeletonAudiencia: React.FC = () => {
  return (
    <Card
      title="Formulario"
      sx={{ padding: '1.2rem', overflow: 'auto', margin: 5 }}
    >
      <Box>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={'100%'}
          height={10}
        />
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={60}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={30}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={30}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default SkeletonAudiencia
