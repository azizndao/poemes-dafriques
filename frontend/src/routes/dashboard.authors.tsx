import { createFileRoute } from '@tanstack/react-router'
import { AuthorsContent } from '../components/dashboard/authors/authors-content'
import { AuthorsError } from '../components/dashboard/authors/authors-error'
import { AuthorsLoading } from '../components/dashboard/authors/authors-loading'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { request } from '../lib/fetch'
import type { Author } from '../types/author'

export const Route = createFileRoute('/dashboard/authors')({
  component: AuthorsPage,
  loader: async () => {
    const response = await request('/authors')
    if (!response.ok) throw new Error('Failed to fetch authors')
    return response.json() as Promise<Author[]>
  },
  errorComponent: AuthorsError,
  pendingComponent: AuthorsLoading,
})

function AuthorsPage() {
  const authors = Route.useLoaderData()
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des auteurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{authors.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ajoutés ce mois-ci</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {authors.filter(author => {
                const authorDate = new Date(author.createdAt)
                const currentDate = new Date('2024-12-20T09:41:45Z')
                return authorDate.getMonth() === currentDate.getMonth() &&
                       authorDate.getFullYear() === currentDate.getFullYear()
              }).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ajoutés aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {authors.filter(author => {
                const authorDate = new Date(author.createdAt)
                const currentDate = new Date('2024-12-20T09:41:45Z')
                return authorDate.toDateString() === currentDate.toDateString()
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <AuthorsContent authors={authors} />
    </div>
  )
}
