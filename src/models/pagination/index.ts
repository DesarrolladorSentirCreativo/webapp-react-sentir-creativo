export interface IPagination<T> {
  count: number
  pageIndex: number
  pageSize: number
  data: T[]
  pageCount: number
}
