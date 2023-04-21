import { useState } from 'react'

import { type SelectOrigen } from '../models'
import origenService from '../services/origen.service'

interface Props {
  origenes: SelectOrigen[]
  loadOrigenes: () => Promise<void>
}

const useOrigen = (): Props => {
  const [origenes, setOrigenes] = useState<SelectOrigen[]>([])

  const loadOrigenes = async (): Promise<void> => {
    const data = await origenService.select()
    setOrigenes(data)
  }

  return {
    origenes,
    loadOrigenes
  }
}

export { useOrigen }
