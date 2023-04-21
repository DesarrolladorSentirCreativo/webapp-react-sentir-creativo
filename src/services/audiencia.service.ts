import axios from 'axios'

import { type Audiencia, type IListAudiencia } from '../models/audiencia'
import { type IPagination } from '../models/pagination'

const paginate = async (pageSize: number, pageIndex: number): Promise<IPagination<IListAudiencia>> => {
  const { data } = await axios.get<IPagination<IListAudiencia>>('/audiencias', {
    params: {
      pageIndex,
      pageSize
    }
  })
  return data
}

const getAll = async (): Promise<Audiencia[]> => {
  const { data } = await axios.get<Audiencia[]>('/audiencias/all')

  return data
}

export default { paginate, getAll }
