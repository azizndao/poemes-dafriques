export interface Author {
  id: number
  firstName: string
  lastName: string
  poemCount: number
  createdAt: string
  updatedAt: string
  poems: Array<{
    id: number
    title: string
    date: string
  }>
}
