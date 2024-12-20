import { createFileRoute } from '@tanstack/react-router'
import { PoemsContent } from '../components/dashboard/poems/poems-content'
import { PoemsError } from '../components/dashboard/poems/poems-error'
import { PoemsLoading } from '../components/dashboard/poems/poems-loading'
import type { Poem } from '../types/poem'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export const Route = createFileRoute('/dashboard/poems')({
  component: PoemsPage,
  loader: async () => {
    const response = await fetch('http://localhost:8080/api/poems')
    if (!response.ok) throw new Error('Failed to fetch poems')
    return response.json() as Promise<Poem[]>
  },
  errorComponent: PoemsError,
  pendingComponent: PoemsLoading,
})

function PoemsPage() {
  const poems = Route.useLoaderData()
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des poèmes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{poems.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publiés aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {poems.filter(poem => 
                new Date(poem.createdAt).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longueur moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(poems.reduce((acc, poem) => acc + poem.content.length, 0) / poems.length)} chars
            </div>
          </CardContent>
        </Card>
      </div>

      <PoemsContent poems={poems} />
    </div>
  )
}
