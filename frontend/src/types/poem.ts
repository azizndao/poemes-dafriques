export interface Poem {
  id: number
  title: string
  content: string
  date: string
  author: {
    id: number
    firstName: string
    lastName: string
  }
  createdAt: string
  updatedAt: string
}
