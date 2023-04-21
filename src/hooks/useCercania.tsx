import { useState } from 'react'

import { type SelectCercania } from '../models'
import cercaniaService from '../services/cercania.service'

interface Props {
  cercanias: SelectCercania[]
  loadCercanias: () => Promise<void>
}

const useCercania = (): Props => {
  const [cercanias, setCercanias] = useState<SelectCercania[]>([])

  const loadCercanias = async (): Promise<void> => {
    const data = await cercaniaService.select()
    setCercanias(data)
  }

  return {
    cercanias,
    loadCercanias
  }
}

export { useCercania }
