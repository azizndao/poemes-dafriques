import { createFileRoute } from '@tanstack/react-router'
import { PoemsContent } from '../components/dashboard/poems/poems-content'
import { PoemsError } from '../components/dashboard/poems/poems-error'
import { PoemsLoading } from '../components/dashboard/poems/poems-loading'
import type { Poem } from '../types/poem'

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
  return <PoemsContent poems={poems} />
}
