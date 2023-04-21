import { useState } from 'react'

import { type SelectPrefijo } from '../models'
import prefijoService from '../services/prefijo.service'

interface Props {
  prefijos: SelectPrefijo[]
  loadPrefijos: () => Promise<void>
}

const usePrefijo = (): Props => {
  const [prefijos, setPrefijos] = useState<SelectPrefijo[]>([])

  const loadPrefijos = async (): Promise<void> => {
    const data = await prefijoService.select()
    setPrefijos(data)
  }

  return {
    prefijos,
    loadPrefijos
  }
}

export { usePrefijo }
