export interface DashboardData {
  totalPoems: number
  totalAuthors: number
  activeAuthors: number
  poemsThisMonth: number
  poemsThisWeek: number
  poemsLastWeek: number
  lastActivityDate: string
  recentPoems: Array<{
    id: number
    title: string
    date: string
    authorName: string
  }>
  topAuthors: Array<{
    id: number
    firstName: string
    lastName: string
    poemCount: number
    lastPublished: string
  }>
} 