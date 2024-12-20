import { createFileRoute } from '@tanstack/react-router'
import { AuthorsContent } from '../components/dashboard/authors/authors-content'
import { AuthorsError } from '../components/dashboard/authors/authors-error'
import { AuthorsLoading } from '../components/dashboard/authors/authors-loading'
import type { Author } from '../types/author'

export const Route = createFileRoute('/dashboard/authors')({
  component: AuthorsPage,
  loader: async () => {
    const response = await fetch('http://localhost:8080/api/authors')
    if (!response.ok) throw new Error('Failed to fetch authors')
    return response.json() as Promise<Author[]>
  },
  errorComponent: AuthorsError,
  pendingComponent: AuthorsLoading,
})

function AuthorsPage() {
  const authors = Route.useLoaderData()
  return <AuthorsContent authors={authors} />
}
