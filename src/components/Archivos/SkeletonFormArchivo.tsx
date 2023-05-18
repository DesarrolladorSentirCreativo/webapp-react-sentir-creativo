import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const SkeletonArchivo: React.FC = () => {
  return (
    <>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={30}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={30}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={30}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={30}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={'100%'}
            height={30}
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
    </>
  )
}

export default SkeletonArchivo
