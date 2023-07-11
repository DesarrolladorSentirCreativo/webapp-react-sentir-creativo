export interface IFormato {
  id: number
  nombre: string
  publishedAt: Date
}

export interface ICreateFormato extends Omit<IFormato, 'id' | 'publishedAt'> {}

export interface IUpdateFormato extends Omit<IFormato, 'publishedAt'> {}

export interface ISelectFormato extends Omit<IFormato, 'publishedAt'> {}
