import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutVacio: React.FC = () => {
  return <>
        <Outlet/>
    </>
}

export default LayoutVacio
