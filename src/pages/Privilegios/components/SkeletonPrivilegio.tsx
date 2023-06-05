import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { type FC } from 'react'

import { Card } from '../../../components/Controls'

const SkeletonPrivilegio: FC = () => {
  return (
    <>
      <Card title="Formulario">
        <Box component="form">
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={'100%'}
              height={20}
            />
          </Typography>
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
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={'100%'}
                height={40}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={'100%'}
                height={40}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  )
}

export default SkeletonPrivilegio
